import { useContext } from 'react';

import { HeaderContext } from '@components/Header/HeaderContext';

const useHeaderContext = () => useContext(HeaderContext);

export default useHeaderContext;
