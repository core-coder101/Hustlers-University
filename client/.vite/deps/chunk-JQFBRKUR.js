import {
  require_react
} from "./chunk-N4N5IM6X.js";
import {
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/@mui/material/FormControl/useFormControl.js
var React2 = __toESM(require_react());

// node_modules/@mui/material/FormControl/FormControlContext.js
var React = __toESM(require_react());
var FormControlContext = React.createContext(void 0);
if (true) {
  FormControlContext.displayName = "FormControlContext";
}
var FormControlContext_default = FormControlContext;

// node_modules/@mui/material/FormControl/useFormControl.js
function useFormControl() {
  return React2.useContext(FormControlContext_default);
}

// node_modules/@mui/material/FormControl/formControlState.js
function formControlState({
  props,
  states,
  muiFormControl
}) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];
    if (muiFormControl) {
      if (typeof props[state] === "undefined") {
        acc[state] = muiFormControl[state];
      }
    }
    return acc;
  }, {});
}

export {
  formControlState,
  FormControlContext_default,
  useFormControl
};
//# sourceMappingURL=chunk-JQFBRKUR.js.map
