<template>
  <div>
    <v-dialog v-model="dialog" width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-icon small color="black" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
        Edit
      </template>

      <v-card>
        <v-card-title>
          <div class="text-">Edit Employee</div>
          <v-spacer></v-spacer>
          <v-icon @click="dialog = false" color="primary">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-0">
            <v-col cols="12">
              <CameraORUpload
                :PreviewImage="defaultImage"
                @imageSrc="handleAttachment"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.name"
                label="Name"
                required
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.email"
                label="Email"
                required
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="payload.phone"
                label="Phone"
                required
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <DatePicker
                label="Date of Birth"
                @date="
                  (e) => {
                    payload.date_of_birth = e.date;
                  }
                "
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.address"
                label="Address"
                required
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.position"
                label="Position"
                required
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.salary"
                label="Salary"
                required
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <DatePicker
                label="Hire Date"
                @date="
                  (e) => {
                    payload.hire_date = e.date;
                  }
                "
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.legal_id"
                label="Legal Id"
                required
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="payload.local_legal_id"
                label="Local Legal Id"
                required
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="error--text" v-if="errorResponse">
              {{ errorResponse }}
            </v-col>
            <v-col cols="12">
              <v-btn type="submit" color="primary" @click="submit"
                >Submit</v-btn
              >
              <v-btn type="submit" @click="dialog = false">Close</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      payload: {},
      dialog: false,
      label: "",
      amount: "",
      src: "",
      errorResponse: null,
      data: [],
      defaultImage: null,
    };
  },
  async created() {
    let { profile_picture, ...remaingFields } = this.item;

    this.defaultImage = profile_picture;

    this.payload = remaingFields;
  },
  methods: {
    handleAttachment(e) {
      this.payload.profile_picture = e;
    },
    async submit() {
      try {
        let formData = new FormData();

        formData.append("name", this.payload.name);
        formData.append("email", this.payload.email);
        formData.append("phone", this.payload.phone);
        formData.append("address", this.payload.address);
        formData.append("date_of_birth", this.payload.date_of_birth);
        formData.append("position", this.payload.position);
        formData.append("salary", this.payload.salary);
        formData.append("hire_date", this.payload.hire_date);
        formData.append("legal_id", this.payload.legal_id);
        formData.append("local_legal_id", this.payload.local_legal_id);

        // Check if profile_picture is present before appending
        if (this.payload.profile_picture) {
          formData.append("profile_picture", this.payload.profile_picture);
        }

        await this.$axios.post("employee-update/" + this.item.id, formData);

        // Reset form fields after submitting
        this.$emit("success", "item has been updated");
        this.dialog = false;
        // Optionally, you can fetch upsrcd data from the server or perform other actions
      } catch ({ response }) {
        this.errorResponse = response.data.message;
      }
    },
  },
};
</script>
