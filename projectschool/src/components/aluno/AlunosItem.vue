<template>
  <div>
    <div class="header">
      <TituloItem texto="Students List" />
    </div>
    <div class="content">
      <div class="left_content">
        <input class="half_input" v-model="nome" placeholder="nome do aluno" />
        <input class="half_input" v-model="sobrenome" placeholder="sobrenome" />
        <input class="half_input" v-model="matricula" placeholder="matricula" />
        <input
          onfocus="(this.type='date')"
          type="text"
          class="half_input"
          v-model="nascimento"
          placeholder="data nasc."
        />
        <button class="btn btn_input" @click="add()">Save</button>
      </div>
      <div class="right_content">
        <table>
          <thead>
            <th>Nome</th>
            <th>Matricula</th>
            <th>Opt</th>
          </thead>
          <tbody v-if="alunos.length">
            <tr v-for="(aluno, index) in alunos" :key="index">
              <td>{{ aluno.nome }} {{ aluno.sobrenome }}</td>
              <td>{{ aluno.matricula }}</td>
              <td>
                <Button
                  class="btn btn_danger material-icons"
                  @click="remover(aluno)"
                >
                  clear
                </Button>
                <Button
                  class="btn btn_edit material-icons"
                  @click="edit(aluno)"
                >
                  edit
                </Button>
              </td>
            </tr>
          </tbody>
          <tfoot v-else class="tfoot_alunos">
            EMPTY
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TituloItem from "../_shared/TituloItem.vue";

export default {
  components: {
    TituloItem,
  },
  props: {},
  data() {
    return {
      id: "",
      nome: "",
      sobrenome: "",
      matricula: "",
      nascimento: "",
      edited: "",
      alunos: [],
      aluno: {
        nome: "",
        sobrenome: "",
        matricula: "",
        nascimento: "",
        edited: "",
      },
    };
  },
  created() {
    this.$http
      .get("http://192.168.1.7:3000/alunos") //metodo get que retona os registros da url
      .then((res) => res.json()) //then it recieves as text, so it has to be converted to json
      .then((alunos) => (this.alunos = alunos)); //now the json entries are passed to the local array
  },
  methods: {
    remover(aluno) {
      this.$http
        .delete(`http://192.168.1.7:3000/alunos/${aluno.id}`)
        .then(() => {
          this.$toasted.success(aluno.nome + " deleted!", {
            duration: 3000,
          });
          let indice = this.alunos.indexOf(aluno);
          this.alunos.splice(indice, 1);
        });
    },

    add() {
      if (
        this.nome == "" ||
        this.matricula == "" ||
        (this.sobrenome == "" && this.edited == false)
      ) {
        //empty info check
        this.$toasted.show("Missing information!", {
          type: "error",
        });
        console.log("Missing information!");
        return;
      }

      let _aluno = {
        id: this.id,
        nome: this.nome,
        sobrenome: this.sobrenome,
        matricula: this.matricula,
        nascimento: this.nascimento,
        edited: false,
      };

      for (let aluno of this.alunos) {
        //repeated info check
        if (
          (aluno.nome + aluno.sobrenome).toLowerCase() ==
            (_aluno.nome + _aluno.sobrenome).toLowerCase() &&
          this.edited == false
        ) {
          this.$toasted.show(
            "There is already a " +
              (_aluno.nome + " " + _aluno.sobrenome).toUpperCase() +
              " saved in the database",
            {
              type: "error",
            }
          );
          console.log("Repeated Information!");
          return;
        }
        if (aluno.matricula == _aluno.matricula && this.edited == false) {
          this.$toasted.show(
            "There is alaready a " + _aluno.matricula + " number registred!",
            {
              type: "error",
            }
          );
          console.log("Repeated Information!");
          return;
        }
      }

      if (!this.edited) {
        // if edited is false, then this is an adding action
        this.$http
          .post("http://192.168.1.7:3000/alunos", _aluno)
          .then((res) => res.json)
          .then((aluno) => {
            this.alunos.push(aluno);
            this.nome = "";
            this.sobrenome = "";
            this.matricula = "";
            this.nascimento = "";
            location.reload();
          });
        this.$toasted.success(_aluno.nome + " added successfully");
      } else {
        //else this is edditing aciton
        this.$http
          .patch(`http://192.168.1.7:3000/alunos/${this.id}`, _aluno)
          .then(() => {
            this.nome = "";
            this.sobrenome = "";
            this.matricula = "";
            this.nascimento = "";
            location.reload();
          });
        this.$toasted.success(_aluno.nome + " edited successfully");
      }
    },

    edit(aluno) {
      this.$http
        .get(`http://192.168.1.7:3000/alunos/${aluno.id}`)
        .then((res) => res.json())
        .then((alunoFromDb) => {
          (this.id = alunoFromDb.id),
            (this.nome = alunoFromDb.nome),
            (this.sobrenome = alunoFromDb.sobrenome),
            (this.matricula = alunoFromDb.matricula),
            (this.nascimento = alunoFromDb.nascimento),
            (this.edited = true);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* ------------- local BODY styling */
input {
  width: 87%;
  padding: 7px 2px;
  border-radius: 5px;
  margin: 1px;
}

.half_input {
  width: 40%;
  padding: 7px 2px;
  border-radius: 5px;
  margin: 1px;
}

.left_content {
  margin: 0;
  width: 45%;
  float: left;
  position: fixed;
}

.right_content {
  margin: 0;
  width: 55%;
  float: right;
}
/* -------------END local BODY styling */

/* ------------- BTN styling */
.btn_input {
  margin: 5px;
  width: 80%;
  padding: 10px 10px;
  background-color: rgb(110, 110, 110);
}
/* ------------- END BTN styling */

/* ------------- table styling */
thead th:nth-child(1) {
  padding: 4px;
  width: 50%;
}
thead th:nth-child(2) {
  padding: 4px;
  width: 30%;
}
thead th:nth-child(3) {
  padding: 4px;
  width: 20%;
}
.tfoot_alunos {
  background-color: rgb(44, 44, 44);
  text-align: center;
  justify-content: center;
}
/* ------------- END table styling */

/* -------------local break points */

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  /* -------------extra small local BODY styling */
  .left_content {
    width: 100%;
    float: none;
    position: static;
  }

  .right_content {
    width: 100%;
    float: none;
    position: static;
  }

  /* -------------END extra small local BODY styling */

  /* ------------- extra small table styling */
  thead th:nth-child(1) {
    width: 50%;
  }
  thead th:nth-child(2) {
    width: 30%;
  }
  thead th:nth-child(3) {
    width: 20%;
  }
  /* -------------END extra small table styling */
}

/* Medium devices (landscape tablets, 768px and down) */
@media only screen and (max-width: 768px) {
  /* -------------Medium local BODY styling */
  .left_content {
    width: 100%;
    float: none;
    position: static;
  }

  .right_content {
    width: 100%;
    float: none;
    position: static;
  }
  /* -------------END Medium local BODY styling */

  /* -------------medium table styling */
  thead th:nth-child(1) {
    width: 40%;
  }
  thead th:nth-child(2) {
    width: 30%;
  }
  thead th:nth-child(3) {
    width: 30%;
  }
}
/* -------------END medium down table styling */
</style>
