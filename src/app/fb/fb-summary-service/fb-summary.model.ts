export class FbSummaryOverAll {
    childSummary?: childSummary
}


export interface childSummary {
    totalCompletedGoals: number,
    childInfo: memberchildInfo[],
    totalPendingGoals: number,
    totalTasks: number,
    totalCompletedTasks: number,
    totalChildBalance: number,
    totalGoals: number,
    totalPendingTasks: number
}

export interface memberchildInfo{
    totalCompletedGoals: number,
    childAccountCurrency: string,
    childAccountBalance: number,
    childNickName: string,
    totalPendingGoals: number,
    childAccount: number,
    totalTasks: number,
    totalCompletedTasks: number,
    totalGoals: number,
    totalPendingTasks: number  
}



 


 