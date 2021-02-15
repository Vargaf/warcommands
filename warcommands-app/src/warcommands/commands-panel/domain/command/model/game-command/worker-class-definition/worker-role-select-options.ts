import { SelectOptionDTO } from '../../class-definition/select-option.dto';

export const workerRoleSelectOptions: SelectOptionDTO[] = [
    {
        value: 'all',
        label: 'all',
        label_id: 'all_workers'
    },
    {
        value: 'matterHarvester',
        label: 'matterHarvester',
        label_id: 'matter_harvester_worker'
    },
    {
        value: 'energyHarvester',
        label: 'energyHarvester',
        label_id: 'energy_harvester_worker'
    },
    {
        value: 'builder',
        label: 'builder',
        label_id: 'builder_worker'
    },
];