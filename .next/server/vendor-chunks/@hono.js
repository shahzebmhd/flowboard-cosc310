"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@hono";
exports.ids = ["vendor-chunks/@hono"];
exports.modules = {

/***/ "(rsc)/./node_modules/@hono/zod-validator/dist/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@hono/zod-validator/dist/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   zValidator: () => (/* binding */ zValidator)\n/* harmony export */ });\n/* harmony import */ var hono_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hono/validator */ \"(rsc)/./node_modules/hono/dist/validator/index.js\");\n\nconst zValidator = (target, schema, hook) => \n// @ts-expect-error not typed well\n(0,hono_validator__WEBPACK_IMPORTED_MODULE_0__.validator)(target, async (value, c) => {\n    const result = await schema.safeParseAsync(value);\n    if (hook) {\n        const hookResult = await hook({ data: value, ...result, target }, c);\n        if (hookResult) {\n            if (hookResult instanceof Response) {\n                return hookResult;\n            }\n            if ('response' in hookResult) {\n                return hookResult.response;\n            }\n        }\n    }\n    if (!result.success) {\n        return c.json(result, 400);\n    }\n    return result.data;\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQGhvbm8vem9kLXZhbGlkYXRvci9kaXN0L2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUNwQztBQUNQO0FBQ0EseURBQVM7QUFDVDtBQUNBO0FBQ0Esd0NBQXdDLGdDQUFnQztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mbG93Ym9hcmQvLi9ub2RlX21vZHVsZXMvQGhvbm8vem9kLXZhbGlkYXRvci9kaXN0L2VzbS9pbmRleC5qcz9iZDQxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZhbGlkYXRvciB9IGZyb20gJ2hvbm8vdmFsaWRhdG9yJztcbmV4cG9ydCBjb25zdCB6VmFsaWRhdG9yID0gKHRhcmdldCwgc2NoZW1hLCBob29rKSA9PiBcbi8vIEB0cy1leHBlY3QtZXJyb3Igbm90IHR5cGVkIHdlbGxcbnZhbGlkYXRvcih0YXJnZXQsIGFzeW5jICh2YWx1ZSwgYykgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNjaGVtYS5zYWZlUGFyc2VBc3luYyh2YWx1ZSk7XG4gICAgaWYgKGhvb2spIHtcbiAgICAgICAgY29uc3QgaG9va1Jlc3VsdCA9IGF3YWl0IGhvb2soeyBkYXRhOiB2YWx1ZSwgLi4ucmVzdWx0LCB0YXJnZXQgfSwgYyk7XG4gICAgICAgIGlmIChob29rUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoaG9va1Jlc3VsdCBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvb2tSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJ3Jlc3BvbnNlJyBpbiBob29rUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvb2tSZXN1bHQucmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4gYy5qc29uKHJlc3VsdCwgNDAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@hono/zod-validator/dist/esm/index.js\n");

/***/ })

};
;