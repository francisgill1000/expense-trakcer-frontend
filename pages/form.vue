<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="12">
              <v-tabs v-model="tab" background-color="primary" dark>
                <v-tab v-for="(item, index) in formPayloads" :key="index">
                  {{ item.label }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="(formPayload, index) in formPayloads"
                  :key="index"
                >
                  <v-card outlined>
                    <v-toolbar dense flat>
                      <!-- <strong> Field {{ index + 1 }}</strong> -->
                      <v-spacer></v-spacer>
                      <v-icon
                        v-if="index > 0"
                        color="red"
                        @click="deleteItem(index)"
                        >mdi-delete</v-icon
                      >
                    </v-toolbar>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="6">
                          <v-autocomplete
                            auto-select-first
                            clearable
                            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                            hide-details
                            dense
                            outlined
                            label="Column"
                            v-model="formPayload.cols"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                          <v-autocomplete
                            auto-select-first
                            clearable
                            :items="[
                              'text',
                              'password',
                              'date',
                              'select',
                              'radio',
                              'checkbox',
                              'button',
                            ]"
                            hide-details
                            dense
                            outlined
                            label="Field Type"
                            v-model="formPayload.type"
                          ></v-autocomplete>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            outlined
                            dense
                            label="Field Name"
                            hide-details
                            v-model="formPayload.name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            outlined
                            dense
                            label="Field Label"
                            hide-details
                            v-model="formPayload.label"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
            <v-col cols="12">
              <!-- <v-btn block color="primary" @click="submit">Submit</v-btn> -->
              <v-btn block color="primary" @click="addNewFormPayload">
                Add Field
                <v-icon right>mdi-plus-circle-outline</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
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
          </v-row>
        </v-col>
      </v-row>
      <div v-html="htmlCode"></div>
      {{ payload }}
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    payload: {},
    formPayloads: [
      {
        name: "field_name_1",
        label: "label",
        type: "text",
        cols: 12,
      },
    ],
    fields: [],
  }),

  mounted() {
    this.submit();
  },

  methods: {
    addNewFormPayload() {
      this.formPayloads.push({
        name: "field_name_" + (parseInt(this.formPayloads.length) + 1),
        label: "label",
        type: "text",
        cols: 12,
      });

      this.submit();

      this.tab++;
    },
    deleteItem(index) {
      this.formPayloads.splice(index, 1);
    },
    submit() {
      this.fields = this.formPayloads;
    },
  },
};
</script>
