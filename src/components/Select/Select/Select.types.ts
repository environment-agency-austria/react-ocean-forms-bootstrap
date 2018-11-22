/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Subtract } from 'react-ocean-forms';

import { ISelectBasePropsBase, SelectBase } from '../SelectBase';

type ISelectBaseDefaultProps = (typeof SelectBase)['defaultProps'];
type WithExcluded = Subtract<ISelectBasePropsBase, ISelectBaseDefaultProps>;

/**
 * Props for the component `Select`
 */
export interface ISelectProps extends WithExcluded, Partial<ISelectBaseDefaultProps> {
}
