export class PlanModel{
    Id: string;
    Name : string;
    Description: string;
    Price: DoubleRange;
    Status: PlanStatus;
}

export enum PlanStatus {
    ACTIVE,
    DESACTIVATE
}

