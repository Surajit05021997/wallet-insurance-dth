<template>
  <div>
    <add-family-member @family-member-added="fetchFamilyMembersList()"></add-family-member>
    <div class="d-flex mb-5 mt-5">
    <h1>Family Members and KYC</h1>
    <span class="ml-1"></span>
    <button type="button" class="btn btn-outline-success btn-text-1_5rem rounded-3" data-bs-toggle="modal" data-bs-target="#addFamilyMember">+ Add Family Member</button>
    </div>
    <hr>
    <div v-if="familyMembersList">
      <div v-if="familyMembersList.length > 0">
        <table class="table table-hover">
          <thead>
            <tr>
              <th v-for="(field, index) in familyMembersFields" :key="index">{{field}}</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(familyMember, index) in familyMembersList" :key="index">
            <td>{{familyMember.familyMemberName}}</td>
            <td>{{familyMember.familyMemberRelation}}</td>
            <td>{{familyMember.familyMemberEmail}}</td>
            <td>{{familyMember.familyMemberMobile}}</td>
            <td>{{familyMember.isAuthorised ? 'Yes' : 'No'}}</td>
            <td>
              <span> 
                  <input type="checkbox" class="btn-check" :id="familyMember.familyMemberMobile" autocomplete="off" :value="familyMember.isAuthorised" @change="changeAuthorisation(familyMember)">
                  <label class="btn btn-outline-primary" :for="familyMember.familyMemberMobile">
                    <span v-if="familyMember.isAuthorised"> Remove</span> 
                    <span v-if="!familyMember.isAuthorised"> Add</span>
                    Authorisation
                  </label>
              </span>
            </td>
            <td>
              <button @click="removeFamilyMember(familyMember.id)" type="button" class="btn btn-danger">Delete Member</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="familyMembersList.length === 0">
        <h2 class="text-muted">No Family Member Added yet.</h2>
            <br>
            <h4>Add a family member by clicking [+ Add Family Member] Button</h4>
            <h4>You can authorise family members for some actions to be done on your behalf.</h4>
      </div>
    </div>
    <div v-if="!familyMembersList" class="container">
      <h2 class="text-muted">Unable to load Family Members.</h2>
      <br>
      <h4>Server Issue</h4>
      <h4>We are sorry for the inconvinience, please try again after some time</h4>
    </div>
  </div>
</template>

<script>
import { getFamilyMembers, updateFamilyMember, deleteFamilyMember } from '@/service/service.js'
import AddFamilyMember from '../components/AddFamilyMember.vue';

export default {
  components: { AddFamilyMember
  },
name: 'KycAuthentication',
data(){ 
    return {
        familyMembersFields : [],
        familyMembersList : null,
    }
},
methods: {
    async initialiseValues(){
      await this.fetchFamilyMembersList();
      this.familyMembersFields = [
        'Name',
        'Relation',
        'Email',
        'Mobile Number',
        'isAuthorised',
        'Action',
        'Delete'
      ];      
    },
    async getFamilyMembersList(){
      const responseData = await getFamilyMembers();
      return responseData;
    },
    async fetchFamilyMembersList(){
      this.familyMembersList = await this.getFamilyMembersList();
    },
    async changeAuthorisation(familyMember){
      let editedFamilyMember = {...familyMember};
      editedFamilyMember.isAuthorised = !editedFamilyMember.isAuthorised;
      const editedFamilyMemberStatusText = await updateFamilyMember(familyMember.id, editedFamilyMember);
      if(editedFamilyMemberStatusText==="OK"){
        await this.fetchFamilyMembersList();
      }
    },
    async removeFamilyMember(id){
      this.$swal({
              title: 'Are you sure?',
              text: "Do you want to remove family member ?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
              if (result.isConfirmed) {
                const deletedStatusText = await deleteFamilyMember(id);
                if(deletedStatusText === "OK"){
                    this.$swal(
                      'Deleted!',
                      'The family member has been deleted.',
                      'success'
                    )
                    await this.fetchFamilyMembersList();
                }
                else{
                    this.$swal({
                      title: 'Could not Delete, Server Issue',
                      text: "Sorry for inconvinience, please reload page",
                      icon: 'warning',
                      timer: 3000
                      })
                }
                  // .then( async ()=>{
                  //     this.$swal(
                  //     'Deleted!',
                  //     'The family member has been deleted.',
                  //     'success'
                  //   )
                  //   await this.fetchFamilyMembersList();
                  // }).catch(()=> {
                  //   this.$swal({
                  //         title: 'Could not Delete, Server Issue',
                  //         text: "Sorry for inconvinience, please reload page",
                  //         icon: 'warning',
                  //         timer: 3000
                  //     })
                  // });           
              }
          })
    }
},
created(){
    this.initialiseValues();
}
}
</script>

<style scoped>
  .btn-text-1_5rem{
  font-size: 1.5rem
}
.ml-1{
  margin-left:1rem;
}
</style>

