<template>
  <div>
    <b-navbar toggleable="lg" type="faded" variant="light">
      <b-navbar-brand to="/" class="ml-3">
        <img src="../assets/logoweb1.png" />
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand style="font-family: 'K2D', sans-serif">
          {{ customerName }}
        </b-navbar-brand>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-navbar-brand v-b-toggle.sidebar-backdrop href="#" class="ml-5">
          <b-icon icon="list" font-scale="2"></b-icon>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
    <b-sidebar
      id="sidebar-backdrop"
      bg-variant="primary"
      text-variant="light"
      backdrop
      right
      shadow="lg"
    >
      <div class="px-3 py-2">
        <b-nav vertical>
          <b-nav-item to="/"><p class="a">หน้าแรก</p></b-nav-item>
          <!-- b-nav-item ไม่มี property style color -->

          <b-nav-item v-if="!isAdmin" to="/aboutus"
            ><p class="a">เกี่ยวกับเรา</p></b-nav-item
          >

          <b-nav-item v-if="$auth.loggedIn && !isAdmin" to="/profile"
            ><p class="a">ข้อมูลสมาชิก</p></b-nav-item
          >
          <b-navbar v-if="!isAdmin" toggleable type="dark">
            <b-navbar-brand href="#">
              <p class="e">ประเมินโรค</p>
            </b-navbar-brand>
            <b-navbar-toggle target="navbar-toggle-collapse1" class="d">
            </b-navbar-toggle>
            <!-- id ยังไม่ได้ใช้ -->
            <b-collapse id="navbar-toggle-collapse1" is-nav>
              <b-navbar-nav class="g">
                <b-nav-item to="/detectdiabetes"
                  ><p class="f">โรคเบาหวาน</p></b-nav-item
                >
                <b-nav-item to="/detectheart"
                  ><p class="f">โรคหัวใจ</p></b-nav-item
                >
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>

          <b-navbar v-if="!isAdmin" toggleable type="dark">
            <b-navbar-brand href="#" target="navbar-toggle-collapse2"
              ><p class="e">ข้อมูลโรค</p></b-navbar-brand
            >
            <b-navbar-toggle target="navbar-toggle-collapse2" class="d">
            </b-navbar-toggle>
            <!-- id ยังไม่ได้ใช้ -->
            <b-collapse id="navbar-toggle-collapse2" is-nav>
              <b-navbar-nav class="g">
                <b-nav-item to="/diabetesinfo"
                  ><p class="f">ข้อมูลโรคเบาหวาน</p></b-nav-item
                >
                <b-nav-item to="/heartinfo"
                  ><p class="f">ข้อมูลโรคหัวใจ</p></b-nav-item
                >
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>

          <b-nav-item v-if="!isAdmin" to="/game"
            ><p class="a">เกมส์ตอบคำถาม</p></b-nav-item
          >
          <b-nav-item v-if="isAdmin" to="/dashboard"
            ><p class="a">แดชบอร์ด</p></b-nav-item
          >
          <b-nav-item v-if="isAdmin" to="/updatemodel"
            ><p class="a">อัพเดทโมเดล</p></b-nav-item
          >
          <b-nav-item v-if="!$auth.loggedIn" to="/login"
            ><p class="a">เข้าสู่ระบบ</p></b-nav-item
          >
          <b-nav-item v-if="!$auth.loggedIn" to="/register"
            ><p class="a">ลงทะเบียน</p></b-nav-item
          >
          <b-nav-item v-if="$auth.loggedIn" @click="logOut"
            ><p class="a">ออกจากระบบ</p></b-nav-item
          >
        </b-nav>
      </div>
    </b-sidebar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    customerName() {
      if (this.$auth.loggedIn && this.$auth.user) {
        return this.$auth.user.FirstName + ' ' + this.$auth.user.LastName
      } else {
        return 'Guest'
      }
    },
    isAdmin() {
      if (this.$auth.user?.role?.name === 'Admin') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    async logOut() {
      await this.$auth.logout()
    },
  },
}
</script>

<style>
/* import font Kanit */
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
/* import font K2D */
@import url('https://fonts.googleapis.com/css2?family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
img {
  width: 70%;
  height: auto;
}
.a {
  color: white;
  font-family: 'K2D', sans-serif;
  font-size: 25px;
}

.a:hover {
  border-left: solid white;
  padding-left: 15px;
  border-width: 4px;
}

.b {
  color: white;
  font-family: 'K2D', sans-serif;
  font-size: 25px;
}

/*adjust dropdown button */
.d {
  margin-bottom: 15px;
  border-width: 5px;
}

.e {
  color: white;
  font-family: 'K2D', sans-serif;
  font-size: 25px;
}

.f {
  color: dodgerblue;
  font-family: 'K2D', sans-serif;
  font-size: 25px;
  padding-left: 20px;
  margin-top: 12px;
}

.f:hover {
  border-left: solid dodgerblue;
  padding-left: 10px;
  border-width: 4px;
  margin-left: 15px;
  margin-top: 12px;
}

.g {
  background-color: white;
  margin-right: 10px;
}

.h {
  height: 50px;
}

.header {
  height: 70px;
  width: 100%;
}
</style>
