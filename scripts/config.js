const path = require("path");

const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const replace = require("rollup-plugin-replace");
const typescript = require("rollup-plugin-typescript2");
const { terser } = require("rollup-plugin-terser");
const { babel } = require("@rollup/plugin-babel");

const version = process.env.VERSION || require("../package.json").version;

const resolve = (p) => {
  return path.resolve(__dirname, "../", p);
};

const builds = {
  "umd-min": {
    entry: resolve("src/index.ts"),
    dest: resolve("dist/index.min.js"),
    format: "umd",
    plugins: [
      babel({
        babelrc: false,
        presets: [["@babel/preset-env", { modules: false }]],
        babelHelpers: "runtime",
        plugins: ["@babel/transform-runtime"],
        extensions: [".js", ".ts"],
      }),
      terser({
        toplevel: true,
        compress: {},
        output: {
          ascii_only: true,
        },
      }),
    ],
  },
  esm: {
    entry: resolve("src/index.ts"),
    dest: resolve("dist/index.esm.js"),
    format: "esm",
    plugins: [],
  },
};

function genConfig(name) {
  const opts = builds[name];
  const config = {
    input: resolve("./src/index.ts"),
    plugins: [
      replace({
        include: opts.entry,
        values: {
          __VERSION__: JSON.stringify(version),
        },
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        clean: true,
        tsconfig: resolve("./tsconfig.json"),
      }),
      ...(opts.plugins || []),
    ],
    output: {
      name: "UseSingleton",
      format: opts.format,
      exports: "named",
      file: opts.dest,
    },
  };
  return config;
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET);
} else {
  exports.getBuild = genConfig;
  exports.getAllConfigs = () => Object.keys(builds).map(genConfig);
}
