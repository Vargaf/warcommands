import { SelectOptionDTO } from '../class-definition/select-option.dto';
import { LogicOperatorENUM } from './logic-operator.enum';

export const logicOperatorSelectOptions: SelectOptionDTO[] = [
    {
        value: LogicOperatorENUM.EqualTo,
        label: '==',
        label_id: 'equal_to_option'
    },
    {
        value: LogicOperatorENUM.NotEqual,
        label: '!=',
        label_id: 'not_equal_option'
    },
    {
        value: LogicOperatorENUM.GreatherThan,
        label: '>',
        label_id: 'greater_than_option'
    },
    {
        value: LogicOperatorENUM.LessThan,
        label: '<',
        label_id: 'less_than_option'
    },
    {
        value: LogicOperatorENUM.GreatherThanOrEqualTo,
        label: '>=',
        label_id: 'greather_than_or_equal_option'
    },
    {
        value: LogicOperatorENUM.LessThan,
        label: '<=',
        label_id: 'less_than_or_equal_option'
    },
];