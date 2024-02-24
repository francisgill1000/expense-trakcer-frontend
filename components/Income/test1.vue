<template>
    <v-app>
      <v-container>
        <v-card outlined>
          <v-card-title dense flat rounded>
            <b>Form Builder</b>
          </v-card-title>
          <v-container>
            <v-row justify="center">
              <v-col
                v-for="(field, index) in fields"
                :key="index"
                :cols="field.cols"
              >
                <v-text-field
                  v-if="field.type == 'password'"
                  outlined
                  dense
                  :type="field.type"
                  v-model="payload[field.name]"
                  :label="field.label"
                  hide-details
                ></v-text-field>
                <v-menu
                  v-else-if="field.type == 'date'"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      dense
                      v-model="payload[field.name]"
                      :label="field.label"
                      persistent-hint
                      prepend-icon=""
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="payload[field.name]"
                    no-title
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
                <v-autocomplete
                  v-else-if="field.type == 'select'"
                  auto-select-first
                  clearable
                  small-chips
                  v-model="payload[field.name]"
                  :items="field.options"
                  hide-details
                  dense
                  outlined
                  :label="field.label"
                ></v-autocomplete>
                <v-radio-group
                  v-else-if="field.type == 'radio'"
                  v-model="payload[field.name]"
                  row
                  dense
                  hide-details
                >
                  <v-radio
                    v-for="(radioOption, index) in field.options"
                    :key="index"
                    :label="radioOption"
                    :value="radioOption"
                  ></v-radio>
                </v-radio-group>
                <v-checkbox
                  v-else-if="field.type == 'checkbox'"
                  v-model="payload[field.name]"
                  :label="field.label"
                ></v-checkbox>
                <v-text-field
                  v-else
                  outlined
                  dense
                  :type="field.type"
                  v-model="payload[field.name]"
                  :label="field.label"
                  hide-details
                ></v-text-field>
              </v-col>
  
              <v-col cols="12">
                {{ payload }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data: () => ({
      payload: {},
      menu2: false,
      fields: [
        {
          name: "full_name",
          label: "Full Name",
          type: "text",
          cols: 4,
        },
        {
          name: "email",
          label: "Email",
          type: "text",
          cols: 4,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          cols: 4,
        },
        {
          name: "phone_number",
          label: "Phone Number",
          type: "text",
          cols: 4,
        },
        {
          name: "birthdate",
          label: "Date Of Birth",
          type: "date",
          cols: 4,
        },
        {
          name: "country",
          label: "Select Country",
          type: "select",
          options: ["USA", "Canada", "UK", "Australia", "Germany"],
          cols: 4,
        },
        {
          name: "gender",
          label: "Gender",
          type: "radio",
          options: ["Male", "Female"],
          cols: 12,
        },
        {
          name: "agree_terms",
          type: "checkbox",
          label: "I agree to the terms and conditions",
          cols: 12,
        },
        {
          name: "submit_button",
          type: "submit",
          value: "Submit",
          cols: 12,
        },
      ],
    }),
  };
  </script>