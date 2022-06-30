function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Positions } from './types';
var commonStyles = {
  position: 'absolute',
  zIndex: 1
};
export var getDecoratorStyles = function getDecoratorStyles(pos) {
  switch (pos) {
    case Positions.TopLeft:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          top: 0,
          left: 0
        });
      }

    case Positions.TopCenter:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          WebkitTransform: 'translateX(-50%)',
          msTransform: 'translateX(-50%)'
        });
      }

    case Positions.TopRight:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          top: 0,
          right: 0
        });
      }

    case Positions.CenterLeft:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          msTransform: 'translateY(-50%)'
        });
      }

    case Positions.CenterCenter:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          WebkitTransform: 'translate(-50%, -50%)',
          msTransform: 'translate(-50%, -50%)'
        });
      }

    case Positions.CenterRight:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          msTransform: 'translateY(-50%)'
        });
      }

    case Positions.BottomLeft:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          bottom: 0,
          left: 0
        });
      }

    case Positions.BottomCenter:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          WebkitTransform: 'translateX(-50%)',
          msTransform: 'translateX(-50%)'
        });
      }

    case Positions.BottomRight:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          bottom: 0,
          right: 0
        });
      }

    default:
      {
        return _objectSpread(_objectSpread({}, commonStyles), {}, {
          top: 0,
          left: 0
        });
      }
  }
};