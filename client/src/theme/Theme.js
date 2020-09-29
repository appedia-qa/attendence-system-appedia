import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { CURRENT_LANGUAGE_KEY, ARABIC_LANGUAGE } from '../constants';

const paletteCustom = {
  primary: {
    300: '#B0B5B9',
    main: '#5F6366',
    600: '#75727C',
    800: '#4D4949',
    900: '#444444',
  },
  secondary: {
    main: '#58C747',
    600: '#99D31C',
    700: '#7CB305'
  },
  primaryTextColor: {
    main: "#2D2D2D"
  },
  primaryLightTextColor: {
    main: '#95999A'
  },
  disabledText: {
    main: '#95989A'
  },
  textSecondary: '#86939e',
  blue: {
    500: '#2B2835',
    600: '#012041',
    800: '#002040'
  },
  white: {
    main: '#fff',
    400: '#F8F8F9',
    300: '#f5f5f5',
    600: '#F5F8FC'
  },
  lightGray: {
    300: '#D6D6D6',
    400: '#E1E1E1',
    main: '#EBEBED',
    600: '#e5e5e5',
    700: '#CBD5DB',
    800: '#b2bbc3'
  },
  gray: {
    300: '#DFDFDF'
  },
  brown: {
    main: '#707070',
    700: '#545454'
  },
  backHome: {
    main: '#545454'
  },
  forgetPass:{
    main: '#707070'
  },
  noAccount: {
    main: '#545454'
  },
  inputColor: {
    main: '#2D2D2D',
  },
  red: {
    main: '#F71515',
    600:  '#E92C2C'
  }

}

const defaultTheme = createMuiTheme();
// localStorage
const currentLanguage = localStorage.getItem(CURRENT_LANGUAGE_KEY);
const useRTL = currentLanguage && currentLanguage === ARABIC_LANGUAGE ? true: false;

const customDirection = useRTL ? 'rtl': 'ltr';

const customTheme = createMuiTheme({
  direction: customDirection,
  palette: {
    ...paletteCustom,
    text: {
      colorTextSecondary :paletteCustom.textGray
    }
  },
  status: {
    danger: 'orange',
    primaryDark: "#191919",
    primaryLight: "#cf7639",
  },
  typography: {
    fontFamily: 'Montserrat',
    allVariants: {
      textAlign: useRTL? 'right': 'left',
      fontFamily: 'Montserrat',
    },
    h1: {
      fontSize: '48px',
      fontWeight: 900,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: '30px',
      }
    },
    h2: {
      fontSize: '36px',
      fontWeight: 700,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: '24px',
      }
    },
    h3: {
      fontSize: '24px',
      fontWeight: 700,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: '18px'
      }
    },
    h5: {
      fontSize: '18px',
      fontWeight: 500,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: '12px'
      }
    },
    h4: {
      fontSize: '20px',
      fontWeight: 600,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: '14px'
      }
    },
    body1: {
      fontSize: '16px',
      color: paletteCustom.primary.main,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: '12px'
      }
    },
    body2: {
      fontSize: '14px',
      color: paletteCustom.primary.main,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: '10px'
      }
    },
    subtitle1: {
      fontSize: '12px',
      lineHeight:1,
      color: paletteCustom.primary.main,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: '9px'
      }
    },
    subtitle2: {
      fontSize: '10px',
      lineHeight:1,
      color: paletteCustom.primary.main,
      [defaultTheme.breakpoints.down("xs")]: {
        fontSize: "6px"
      }
    },
    button: {
      textTransform: 'none'
    }
  },
  overrides:{
    MuiChip:{
      sizeSmall:{
        height: '20px',
        backgroundColor: paletteCustom.secondary.main,
        fontSize: '10px',

        [defaultTheme.breakpoints.down("xs")]: {
          height: '14px',
          fontSize: '6px'
        }
      }
    },
    MuiCard:{
      root:{
        [defaultTheme.breakpoints.down("xs")]: {
          fontSize: "6px",
        }
      }
    },
    MuiRating: {
      root: {
        color: defaultTheme.palette.lightGray, 
      },
      icon: {
        color: paletteCustom.primary.main
      }
    },
    MuiPaginationItem: {
      root: {
        margin:0,
      },
      
    },
    MuiSelect:{
      root: {
      },
      input: {
      },
      selectMenu: {
        padding: "2px 10px",
        fontSize: "10px",
      },
      iconOutlined: {
        width: '15px',
        height: '15px',
        padding: '5px'
      },
      outlined: {
        borderRadius:0
      }
    },
    MuiTabs: {
      root: {
      },
      indicator: {
        backgroundColor: paletteCustom.brown.main
      }
    },
    MuiTab: {
      root: {
        minWidth: "100px !important",
        [defaultTheme.breakpoints.down("xs")]: {
          maxWidth: '33%',
        }
      },
      wrapper: {
        color: paletteCustom.primary.main,
      }
    },
    MuiDrawer: {
      paper: {
        height: '100%',
      }
    },
    MuiListItemText:{
      root:{
        fontSize: '20px !important',
        fontWeight: '500 !important',
      }
    },
    MuiDivider:{
      root:{
        opacity: .3,
        backgroundColor: paletteCustom.lightGray[600],
      }
    },
    MuiButtonBase: {
    }
  },
  spacing: setSpacing
});

const themeWithResponsiveFonts = responsiveFontSizes(customTheme);

export default themeWithResponsiveFonts;


function setSpacing(factor) {
  const width = window.innerWidth;
  if (width > defaultTheme.breakpoints.values.md) {
    return 10 * factor;
  } else if (width > defaultTheme.breakpoints.values.sm) {
    return 7 * factor;
  } else {
    return 5 * factor;
  }
}
