<template>
  <div class="generator-form">
    <v-form ref="form" v-model="valid">
      <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Ime grada"
              data-vv-name="name"
              required
      ></v-text-field>
      <v-text-field
              v-model="identifier"
              label="Identifikacioni broj grada"
              :rules="numberRules"
              type="number"
              data-vv-name="amount"
              required
      ></v-text-field>

      <v-text-field
              v-model="amount"
              label="Kolicina blokova"
              :counter="30"
              :rules="amountRules"
              type="number"
              data-vv-name="amount"
              required
      ></v-text-field>
      <v-text-field
              v-model="counter_start"
              label="Prvi redni broj u bloku"
              :rules="numberRules"
              type="number"
              data-vv-name="amount"
              required
      ></v-text-field>
      <v-btn @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>

  </div>
</template>

<script>
import GeneratorService from '../services/GeneratorService';

const nameToFileName = (name) => {
    return name.toLowerCase().split(' ').join('-');
};

export default {
  name: 'Generator',
    data: () => ({
      name: '',
      amount: 1,
      identifier: 1,
      counter_start: 1,
      // rules and valdiation
      valid: false,
      numberRules: [
          v => !!v,
          v => v > 0 || 'Identifier must be > 0'
      ],
      amountRules: [
          v => !!v,
          v => v < 30 || 'Amount must be < 30'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length > 0
      ]
    }),

    methods: {
      formatData() {
          return {
              name: this.name,
              amount: parseInt(this.amount),
              identifier: parseInt(this.identifier),
              counter_start: parseInt(this.counter_start)
          };
      },
      submit () {
        if (!this.valid) {
            this.$refs.form.validate();
            return false;
        }
        const data = this.formatData();
        GeneratorService.generate(data).then((response) => {
            let blob = new Blob([response.data], { type: 'text/tsv' });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'baza-'+ nameToFileName(data.name) + '.txt';
            link.click();
        })
      },
      clear () {
        this.name = '';
        this.amount = 1;
        this.identifier = 1;
        this.counter_start = 1;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.generator-form {
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 600px
}
</style>
