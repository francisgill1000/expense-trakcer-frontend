<template>
  <v-card>
       <v-card-text>
         <v-row>
             <v-col cols="12">
               <v-text-field
                 v-model="label"
                 label="Label"
                 outlined
                 dense
                 hide-details
                 required
               ></v-text-field>
             </v-col>
             <v-col cols="12">
               <v-text-field
                 v-model="amount"
                 label="Amount"
                 type="number"
                 required
                 outlined
                 dense
                 hide-details
               ></v-text-field>
             </v-col>
             <v-col cols="12">
               <DatePicker
                 @date="
                   (e) => {
                     date = e.date;
                   }
                 "
               />
             </v-col>
             <v-col cols="12" class="error--text" v-if="errorResponse">
               {{ errorResponse }}
             </v-col>
             <v-col cols="12">
               <v-btn type="submit" color="primary" @click="submit" block
                 >Submit</v-btn
               >
             </v-col>
           </v-row>
       </v-card-text>
     </v-card>
</template>
<script>
export default {
 data() {
   return {
     dialog: false,
     label: "",
     amount: "",
     date: null,
     errorResponse: null,
     data: [],
   };
 },
 async created() {
   // this.getData();
 },
 methods: {
   // async getData() {
   //   this.data = await this.$axios.get(`https://backend.florencetech.online/api/income`);
   // },
   async submit() {
     try {
       const incomeData = {
         label: this.label,
         amount: this.amount,
         date: this.date,
         user_id: this.$auth.user.id,
       };
       // Sending the income data to the backend
       await this.$axios.post("income", incomeData);

       // Reset form fields after submitting
       this.label = "";
       this.amount = "";
       this.date = null;

       this.$emit("success", "Income has been created");
       this.dialog = false;
       // Optionally, you can fetch updated data from the server or perform other actions
     } catch ({ response }) {
       this.errorResponse = response.data.message;
       // console.error("Error adding income:", response.data.message);
     }
   },
 },
};
</script>
