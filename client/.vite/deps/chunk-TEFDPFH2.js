import {
  Typography_default
} from "./chunk-NG2VY6HZ.js";
import {
  ListContext_default
} from "./chunk-2OCNDRV5.js";
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

// node_modules/@mui/material/ListItemText/ListItemText.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_DefaultPropsProvider();
init_styled();

// node_modules/@mui/material/ListItemText/listItemTextClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getListItemTextUtilityClass(slot) {
  return generateUtilityClass("MuiListItemText", slot);
}
var listItemTextClasses = generateUtilityClasses("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
var listItemTextClasses_default = listItemTextClasses;

// node_modules/@mui/material/ListItemText/ListItemText.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    inset,
    primary,
    secondary,
    dense
  } = ownerState;
  const slots = {
    root: ["root", inset && "inset", dense && "dense", primary && secondary && "multiline"],
    primary: ["primary"],
    secondary: ["secondary"]
  };
  return composeClasses(slots, getListItemTextUtilityClass, classes);
};
var ListItemTextRoot = styled_default("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${listItemTextClasses_default.primary}`]: styles.primary
    }, {
      [`& .${listItemTextClasses_default.secondary}`]: styles.secondary
    }, styles.root, ownerState.inset && styles.inset, ownerState.primary && ownerState.secondary && styles.multiline, ownerState.dense && styles.dense];
  }
})(({
  ownerState
}) => _extends({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4
}, ownerState.primary && ownerState.secondary && {
  marginTop: 6,
  marginBottom: 6
}, ownerState.inset && {
  paddingLeft: 56
}));
var ListItemText = React.forwardRef(function ListItemText2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiListItemText"
  });
  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    dense
  } = React.useContext(ListContext_default);
  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;
  const ownerState = _extends({}, props, {
    disableTypography,
    inset,
    primary: !!primary,
    secondary: !!secondary,
    dense
  });
  const classes = useUtilityClasses(ownerState);
  if (primary != null && primary.type !== Typography_default && !disableTypography) {
    primary = (0, import_jsx_runtime.jsx)(Typography_default, _extends({
      variant: dense ? "body2" : "body1",
      className: classes.primary,
      component: primaryTypographyProps != null && primaryTypographyProps.variant ? void 0 : "span",
      display: "block"
    }, primaryTypographyProps, {
      children: primary
    }));
  }
  if (secondary != null && secondary.type !== Typography_default && !disableTypography) {
    secondary = (0, import_jsx_runtime.jsx)(Typography_default, _extends({
      variant: "body2",
      className: classes.secondary,
      color: "text.secondary",
      display: "block"
    }, secondaryTypographyProps, {
      children: secondary
    }));
  }
  return (0, import_jsx_runtime2.jsxs)(ListItemTextRoot, _extends({
    className: clsx_default(classes.root, className),
    ownerState,
    ref
  }, other, {
    children: [primary, secondary]
  }));
});
true ? ListItemText.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Alias for the `primary` prop.
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
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: import_prop_types.default.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: import_prop_types.default.bool,
  /**
   * The main content element.
   */
  primary: import_prop_types.default.node,
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: import_prop_types.default.object,
  /**
   * The secondary content element.
   */
  secondary: import_prop_types.default.node,
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var ListItemText_default = ListItemText;

export {
  getListItemTextUtilityClass,
  listItemTextClasses_default,
  ListItemText_default
};
//# sourceMappingURL=chunk-TEFDPFH2.js.map
