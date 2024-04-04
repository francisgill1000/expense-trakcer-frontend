<template>
  <div>
    <v-dialog v-model="dialog" width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-icon small color="secondary" v-bind="attrs" v-on="on">mdi-eye</v-icon>
        View
      </template>

      <v-card>
        <v-card-title>
          <div class="headline text-centers">View your employee</div>
          <v-spacer></v-spacer>
          <v-icon @click="dialog = false" color="primary">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-row>
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
                </v-row>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-avatar v-if="payload && payload.profile_picture" size="250">
                  <v-img :src="payload.profile_picture"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payload.position"
                  label="Position"
                  required
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="payload.salary"
                  label="Salary"
                  required
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <DatePicker
                  label="Hire Date"
                  @date="
                    (e) => {
                      payload.hire_date = e.date;
                    }
                  "
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="payload.legal_id"
                  label="Legal Id"
                  required
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
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
            </v-row>
          </v-container>
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
    };
  },
  async created() {
    this.payload = this.item;
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

        await this.$axios.post("employee", formData);

        // Reset form fields after submitting
        this.$emit("success", "item has been created");
        this.dialog = false;
        // Optionally, you can fetch upsrcd data from the server or perform other actions
      } catch ({ response }) {
        this.errorResponse = response.data.message;
      }
    },
  },
};
</script>
