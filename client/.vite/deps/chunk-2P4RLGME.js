import {
  Grow_default
} from "./chunk-ZZYEBXMQ.js";
import {
  ClickAwayListener,
  useSnackbar
} from "./chunk-ST7GYZMF.js";
import {
  useSlotProps
} from "./chunk-7B4JDJS4.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-K4SXMS4P.js";
import {
  Paper_default
} from "./chunk-DITQQIUL.js";
import {
  useTheme
} from "./chunk-GBLPTBDK.js";
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
  require_colorManipulator,
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

// node_modules/@mui/material/Snackbar/Snackbar.js
init_objectWithoutPropertiesLoose();
init_extends();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_composeClasses();
init_styled();
init_DefaultPropsProvider();
init_capitalize();

// node_modules/@mui/material/SnackbarContent/SnackbarContent.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
var import_colorManipulator = __toESM(require_colorManipulator());
init_styled();
init_DefaultPropsProvider();

// node_modules/@mui/material/SnackbarContent/snackbarContentClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getSnackbarContentUtilityClass(slot) {
  return generateUtilityClass("MuiSnackbarContent", slot);
}
var snackbarContentClasses = generateUtilityClasses("MuiSnackbarContent", ["root", "message", "action"]);
var snackbarContentClasses_default = snackbarContentClasses;

// node_modules/@mui/material/SnackbarContent/SnackbarContent.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["action", "className", "message", "role"];
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    action: ["action"],
    message: ["message"]
  };
  return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};
var SnackbarContentRoot = styled_default(Paper_default, {
  name: "MuiSnackbarContent",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => {
  const emphasis = theme.palette.mode === "light" ? 0.8 : 0.98;
  const backgroundColor = (0, import_colorManipulator.emphasize)(theme.palette.background.default, emphasis);
  return _extends({}, theme.typography.body2, {
    color: theme.vars ? theme.vars.palette.SnackbarContent.color : theme.palette.getContrastText(backgroundColor),
    backgroundColor: theme.vars ? theme.vars.palette.SnackbarContent.bg : backgroundColor,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "6px 16px",
    borderRadius: (theme.vars || theme).shape.borderRadius,
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      flexGrow: "initial",
      minWidth: 288
    }
  });
});
var SnackbarContentMessage = styled_default("div", {
  name: "MuiSnackbarContent",
  slot: "Message",
  overridesResolver: (props, styles) => styles.message
})({
  padding: "8px 0"
});
var SnackbarContentAction = styled_default("div", {
  name: "MuiSnackbarContent",
  slot: "Action",
  overridesResolver: (props, styles) => styles.action
})({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  paddingLeft: 16,
  marginRight: -8
});
var SnackbarContent = React.forwardRef(function SnackbarContent2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiSnackbarContent"
  });
  const {
    action,
    className,
    message,
    role = "alert"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime2.jsxs)(SnackbarContentRoot, _extends({
    role,
    square: true,
    elevation: 6,
    className: clsx_default(classes.root, className),
    ownerState,
    ref
  }, other, {
    children: [(0, import_jsx_runtime.jsx)(SnackbarContentMessage, {
      className: classes.message,
      ownerState,
      children: message
    }), action ? (0, import_jsx_runtime.jsx)(SnackbarContentAction, {
      className: classes.action,
      ownerState,
      children: action
    }) : null]
  }));
});
true ? SnackbarContent.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The message to display.
   */
  message: import_prop_types.default.node,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var SnackbarContent_default = SnackbarContent;

// node_modules/@mui/material/Snackbar/snackbarClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getSnackbarUtilityClass(slot) {
  return generateUtilityClass("MuiSnackbar", slot);
}
var snackbarClasses = generateUtilityClasses("MuiSnackbar", ["root", "anchorOriginTopCenter", "anchorOriginBottomCenter", "anchorOriginTopRight", "anchorOriginBottomRight", "anchorOriginTopLeft", "anchorOriginBottomLeft"]);
var snackbarClasses_default = snackbarClasses;

// node_modules/@mui/material/Snackbar/Snackbar.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded2 = ["onEnter", "onExited"];
var _excluded22 = ["action", "anchorOrigin", "autoHideDuration", "children", "className", "ClickAwayListenerProps", "ContentProps", "disableWindowBlurListener", "message", "onBlur", "onClose", "onFocus", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "TransitionComponent", "transitionDuration", "TransitionProps"];
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    anchorOrigin
  } = ownerState;
  const slots = {
    root: ["root", `anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}`]
  };
  return composeClasses(slots, getSnackbarUtilityClass, classes);
};
var SnackbarRoot = styled_default("div", {
  name: "MuiSnackbar",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`anchorOrigin${capitalize_default(ownerState.anchorOrigin.vertical)}${capitalize_default(ownerState.anchorOrigin.horizontal)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const center = {
    left: "50%",
    right: "auto",
    transform: "translateX(-50%)"
  };
  return _extends({
    zIndex: (theme.vars || theme).zIndex.snackbar,
    position: "fixed",
    display: "flex",
    left: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center"
  }, ownerState.anchorOrigin.vertical === "top" ? {
    top: 8
  } : {
    bottom: 8
  }, ownerState.anchorOrigin.horizontal === "left" && {
    justifyContent: "flex-start"
  }, ownerState.anchorOrigin.horizontal === "right" && {
    justifyContent: "flex-end"
  }, {
    [theme.breakpoints.up("sm")]: _extends({}, ownerState.anchorOrigin.vertical === "top" ? {
      top: 24
    } : {
      bottom: 24
    }, ownerState.anchorOrigin.horizontal === "center" && center, ownerState.anchorOrigin.horizontal === "left" && {
      left: 24,
      right: "auto"
    }, ownerState.anchorOrigin.horizontal === "right" && {
      right: 24,
      left: "auto"
    })
  });
});
var Snackbar = React2.forwardRef(function Snackbar2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiSnackbar"
  });
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    action,
    anchorOrigin: {
      vertical,
      horizontal
    } = {
      vertical: "bottom",
      horizontal: "left"
    },
    autoHideDuration = null,
    children,
    className,
    ClickAwayListenerProps,
    ContentProps,
    disableWindowBlurListener = false,
    message,
    open,
    TransitionComponent = Grow_default,
    transitionDuration = defaultTransitionDuration,
    TransitionProps: {
      onEnter,
      onExited
    } = {}
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded2), other = _objectWithoutPropertiesLoose(props, _excluded22);
  const ownerState = _extends({}, props, {
    anchorOrigin: {
      vertical,
      horizontal
    },
    autoHideDuration,
    disableWindowBlurListener,
    TransitionComponent,
    transitionDuration
  });
  const classes = useUtilityClasses2(ownerState);
  const {
    getRootProps,
    onClickAway
  } = useSnackbar(_extends({}, ownerState));
  const [exited, setExited] = React2.useState(true);
  const rootProps = useSlotProps({
    elementType: SnackbarRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref
    },
    className: [classes.root, className]
  });
  const handleExited = (node) => {
    setExited(true);
    if (onExited) {
      onExited(node);
    }
  };
  const handleEnter = (node, isAppearing) => {
    setExited(false);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };
  if (!open && exited) {
    return null;
  }
  return (0, import_jsx_runtime3.jsx)(ClickAwayListener, _extends({
    onClickAway
  }, ClickAwayListenerProps, {
    children: (0, import_jsx_runtime3.jsx)(SnackbarRoot, _extends({}, rootProps, {
      children: (0, import_jsx_runtime3.jsx)(TransitionComponent, _extends({
        appear: true,
        in: open,
        timeout: transitionDuration,
        direction: vertical === "top" ? "down" : "up",
        onEnter: handleEnter,
        onExited: handleExited
      }, TransitionProps, {
        children: children || (0, import_jsx_runtime3.jsx)(SnackbarContent_default, _extends({
          message,
          action
        }, ContentProps))
      }))
    }))
  }));
});
true ? Snackbar.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: import_prop_types2.default.node,
  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin: import_prop_types2.default.shape({
    horizontal: import_prop_types2.default.oneOf(["center", "left", "right"]).isRequired,
    vertical: import_prop_types2.default.oneOf(["bottom", "top"]).isRequired
  }),
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: import_prop_types2.default.number,
  /**
   * Replace the `SnackbarContent` component.
   */
  children: import_prop_types2.default.element,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types2.default.object,
  /**
   * @ignore
   */
  className: import_prop_types2.default.string,
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: import_prop_types2.default.object,
  /**
   * Props applied to the [`SnackbarContent`](/material-ui/api/snackbar-content/) element.
   */
  ContentProps: import_prop_types2.default.object,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: import_prop_types2.default.bool,
  /**
   * When displaying multiple consecutive snackbars using a single parent-rendered
   * `<Snackbar/>`, add the `key` prop to ensure independent treatment of each message.
   * For instance, use `<Snackbar key={message} />`. Otherwise, messages might update
   * in place, and features like `autoHideDuration` could be affected.
   */
  key: () => null,
  /**
   * The message to display.
   */
  message: import_prop_types2.default.node,
  /**
   * @ignore
   */
  onBlur: import_prop_types2.default.func,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: import_prop_types2.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types2.default.func,
  /**
   * @ignore
   */
  onMouseEnter: import_prop_types2.default.func,
  /**
   * @ignore
   */
  onMouseLeave: import_prop_types2.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types2.default.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: import_prop_types2.default.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: import_prop_types2.default.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: import_prop_types2.default.oneOfType([import_prop_types2.default.number, import_prop_types2.default.shape({
    appear: import_prop_types2.default.number,
    enter: import_prop_types2.default.number,
    exit: import_prop_types2.default.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: import_prop_types2.default.object
} : void 0;
var Snackbar_default = Snackbar;

export {
  getSnackbarContentUtilityClass,
  snackbarContentClasses_default,
  SnackbarContent_default,
  getSnackbarUtilityClass,
  snackbarClasses_default,
  Snackbar_default
};
//# sourceMappingURL=chunk-2P4RLGME.js.map
