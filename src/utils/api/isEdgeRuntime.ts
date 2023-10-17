import { ERuntimeValueType } from '@interfaces/common';

import { ERuntime } from '@enums/enums';

const isEdgeRuntime = (runtime?: ERuntimeValueType) => runtime && runtime === ERuntime.edge;

export default isEdgeRuntime;
