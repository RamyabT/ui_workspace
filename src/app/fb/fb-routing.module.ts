import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbChildrenHomeComponent } from './fb-children-home/fb-children-home.component';
import { addChildAccountComponent } from './addChildAccount/add-child-account.component';
import { FbHomeComponent } from './fb-home/fb-home.component';
import { RetailAddGoalComponent } from './retail-add-goal/retail-add-goal.component';
import { RetailFamilyPaymentFormComponent } from './retail-family-payment-form/retail-family-payment-form.component';
import { RetailAddTaskFromComponent } from './retail-add-task-form/reatail-add-task-form.component';
import { FbConfirmationReceiptFormComponent } from './fb-confirmation-receipt-form/fb-confirmation-receipt-form.component';
import { MemberViewGoalsComponent } from './member-view-goals/member-view-goals.component';
import { ManageMemberAllowanceComponent } from './manage-member-allowance/manage-member-allowance.component';
import { MemberViewChoresComponent } from './member-view-chores/member-view-chores.component';

const routes: Routes = [
  {
    path : '',
     component : FbHomeComponent,
 },
  {
    path : 'fb-children-home',
     component : FbChildrenHomeComponent,
     data:{title:"FbChildrenHomeForm.title",module:' FbModule'}
 },
 {
  path : 'fb-add-child-account',
   component : addChildAccountComponent,
   data:{title:"addChildAccount.title",module:' FbModule'}
},
{
  path : 'retail-add-goal',
component : RetailAddGoalComponent,
data:{title:"RetailAddGoal.title",module:' FbModule'}
},
{
  path: 'family-payment',
  component: RetailFamilyPaymentFormComponent,
  data: { title: 'RetailFamilyPaymentForm.title',module:' FbModule' }
},
{
  path: 'retail-add-task-form',
  component: RetailAddTaskFromComponent,
  data: { title: "RetailAddTaskFrom.title",module:' FbModule' }
},
{
  path: "fb-confirmation-receipt",
  component: FbConfirmationReceiptFormComponent,
data: { title: "confirmationReceiptForm.title" },
},
{
  path: 'member-view-goals',
  component: MemberViewGoalsComponent,
  data: { title: 'MemberViewGoals.title',module:' FbModule' }
},
{
  path: 'manage-member-allowance',
  component: ManageMemberAllowanceComponent,
  data: { title: 'ManageAllowance.title',module:' FbModule' }
},
{
  path: 'member-view-chores',
  component: MemberViewChoresComponent,
  data: { title: 'MemberViewChores.title',module:' FbModule' }
},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FbRoutingModule { }



 