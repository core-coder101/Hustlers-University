import {
  formControlState,
  useFormControl
} from "./chunk-JQFBRKUR.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-K4SXMS4P.js";
import {
  init_DefaultPropsProvider,
  useDefaultProps
} from "./chunk-QGICQ56W.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_styled,
  rootShouldForwardProp_default,
  styled_default
} from "./chunk-JMMXXZJA.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-WKJ4PPP4.js";
import {
  _objectWithoutPropertiesLoose,
  init_objectWithoutPropertiesLoose
} from "./chunk-2TJCF3JD.js";
import {
  require_jsx_runtime
} from "./chunk-GGADGINT.js";
import {
  require_prop_types
} from "./chunk-E4AT6V7E.js";
import {
  _extends,
  init_extends
} from "./chunk-72JO3JMQ.js";
import {
  require_react
} from "./chunk-N4N5IM6X.js";
import {
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/@mui/material/InputLabel/InputLabel.js
init_objectWithoutPropertiesLoose();
init_extends();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_composeClasses();
init_clsx();

// node_modules/@mui/material/FormLabel/FormLabel.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_capitalize();
init_DefaultPropsProvider();
init_styled();

// node_modules/@mui/material/FormLabel/formLabelClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getFormLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormLabel", slot);
}
var formLabelClasses = generateUtilityClasses("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]);
var formLabelClasses_default = formLabelClasses;

// node_modules/@mui/material/FormLabel/FormLabel.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    color,
    focused,
    disabled,
    error,
    filled,
    required
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize_default(color)}`, disabled && "disabled", error && "error", filled && "filled", focused && "focused", required && "required"],
    asterisk: ["asterisk", error && "error"]
  };
  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
var FormLabelRoot = styled_default("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: ({
    ownerState
  }, styles) => {
    return _extends({}, styles.root, ownerState.color === "secondary" && styles.colorSecondary, ownerState.filled && styles.filled);
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary
}, theme.typography.body1, {
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  [`&.${formLabelClasses_default.focused}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  },
  [`&.${formLabelClasses_default.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled
  },
  [`&.${formLabelClasses_default.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
var AsteriskComponent = styled_default("span", {
  name: "MuiFormLabel",
  slot: "Asterisk",
  overridesResolver: (props, styles) => styles.asterisk
})(({
  theme
}) => ({
  [`&.${formLabelClasses_default.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
var FormLabel = React.forwardRef(function FormLabel2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormLabel"
  });
  const {
    children,
    className,
    component = "label"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  });
  const ownerState = _extends({}, props, {
    color: fcs.color || "primary",
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsxs)(FormLabelRoot, _extends({
    as: component,
    ownerState,
    className: clsx_default(classes.root, className),
    ref
  }, other, {
    children: [children, fcs.required && (0, import_jsx_runtime.jsxs)(AsteriskComponent, {
      ownerState,
      "aria-hidden": true,
      className: classes.asterisk,
      children: [" ", "*"]
    })]
  }));
});
true ? FormLabel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: import_prop_types.default.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: import_prop_types.default.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: import_prop_types.default.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: import_prop_types.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var FormLabel_default = FormLabel;

// node_modules/@mui/material/InputLabel/InputLabel.js
init_DefaultPropsProvider();
init_capitalize();
init_styled();

// node_modules/@mui/material/InputLabel/inputLabelClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getInputLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiInputLabel", slot);
}
var inputLabelClasses = generateUtilityClasses("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
var inputLabelClasses_default = inputLabelClasses;

// node_modules/@mui/material/InputLabel/InputLabel.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded2 = ["disableAnimation", "margin", "shrink", "variant", "className"];
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    formControl,
    size,
    shrink,
    disableAnimation,
    variant,
    required
  } = ownerState;
  const slots = {
    root: ["root", formControl && "formControl", !disableAnimation && "animated", shrink && "shrink", size && size !== "normal" && `size${capitalize_default(size)}`, variant],
    asterisk: [required && "asterisk"]
  };
  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
  return _extends({}, classes, composedClasses);
};
var InputLabelRoot = styled_default(FormLabel_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formLabelClasses_default.asterisk}`]: styles.asterisk
    }, styles.root, ownerState.formControl && styles.formControl, ownerState.size === "small" && styles.sizeSmall, ownerState.shrink && styles.shrink, !ownerState.disableAnimation && styles.animated, ownerState.focused && styles.focused, styles[ownerState.variant]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%"
}, ownerState.formControl && {
  position: "absolute",
  left: 0,
  top: 0,
  // slight alteration to spec spacing to match visual spec result
  transform: "translate(0, 20px) scale(1)"
}, ownerState.size === "small" && {
  // Compensation for the `Input.inputSizeSmall` style.
  transform: "translate(0, 17px) scale(1)"
}, ownerState.shrink && {
  transform: "translate(0, -1.5px) scale(0.75)",
  transformOrigin: "top left",
  maxWidth: "133%"
}, !ownerState.disableAnimation && {
  transition: theme.transitions.create(["color", "transform", "max-width"], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeOut
  })
}, ownerState.variant === "filled" && _extends({
  // Chrome's autofill feature gives the input field a yellow background.
  // Since the input field is behind the label in the HTML tree,
  // the input field is drawn last and hides the label with an opaque background color.
  // zIndex: 1 will raise the label above opaque background-colors of input.
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(12px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(12px, 13px) scale(1)"
}, ownerState.shrink && _extends({
  userSelect: "none",
  pointerEvents: "auto",
  transform: "translate(12px, 7px) scale(0.75)",
  maxWidth: "calc(133% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(12px, 4px) scale(0.75)"
})), ownerState.variant === "outlined" && _extends({
  // see comment above on filled.zIndex
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(14px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(14px, 9px) scale(1)"
}, ownerState.shrink && {
  userSelect: "none",
  pointerEvents: "auto",
  // Theoretically, we should have (8+5)*2/0.75 = 34px
  // but it feels a better when it bleeds a bit on the left, so 32px.
  maxWidth: "calc(133% - 32px)",
  transform: "translate(14px, -9px) scale(0.75)"
})));
var InputLabel = React2.forwardRef(function InputLabel2(inProps, ref) {
  const props = useDefaultProps({
    name: "MuiInputLabel",
    props: inProps
  });
  const {
    disableAnimation = false,
    shrink: shrinkProp,
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const muiFormControl = useFormControl();
  let shrink = shrinkProp;
  if (typeof shrink === "undefined" && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["size", "variant", "required", "focused"]
  });
  const ownerState = _extends({}, props, {
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
    required: fcs.required,
    focused: fcs.focused
  });
  const classes = useUtilityClasses2(ownerState);
  return (0, import_jsx_runtime2.jsx)(InputLabelRoot, _extends({
    "data-shrink": shrink,
    ownerState,
    ref,
    className: clsx_default(classes.root, className)
  }, other, {
    classes
  }));
});
true ? InputLabel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types2.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types2.default.object,
  /**
   * @ignore
   */
  className: import_prop_types2.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: import_prop_types2.default.oneOfType([import_prop_types2.default.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), import_prop_types2.default.string]),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: import_prop_types2.default.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types2.default.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: import_prop_types2.default.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: import_prop_types2.default.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: import_prop_types2.default.oneOf(["dense"]),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: import_prop_types2.default.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: import_prop_types2.default.bool,
  /**
   * The size of the component.
   * @default 'normal'
   */
  size: import_prop_types2.default.oneOfType([import_prop_types2.default.oneOf(["normal", "small"]), import_prop_types2.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * The variant to use.
   */
  variant: import_prop_types2.default.oneOf(["filled", "outlined", "standard"])
} : void 0;
var InputLabel_default = InputLabel;

export {
  getFormLabelUtilityClasses,
  formLabelClasses_default,
  FormLabelRoot,
  FormLabel_default,
  getInputLabelUtilityClasses,
  inputLabelClasses_default,
  InputLabel_default
};
//# sourceMappingURL=chunk-PKETHS2R.js.map
