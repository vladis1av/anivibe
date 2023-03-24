import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type BreakpointsParamTypes = 'up' | 'down';

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

const useCheckScreenSize = (
  breakpointsParam: BreakpointsParamTypes = 'down',
  screenSize: ScreenSize = 'sm',
): boolean => {
  const theme = useTheme();

  const isExpectedScreen = useMediaQuery(
    theme.breakpoints[breakpointsParam](screenSize),
    { defaultMatches: true },
  );

  return isExpectedScreen;
};

export default useCheckScreenSize;
