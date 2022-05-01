<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <PageLab v-else :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />

        <div class="theme-default-content" style="padding: 0 rem 0 rem;">
          <h2>Grading Rubric<a href="#rubrica" class="header-anchor">#</a></h2>
          <Rubrica></Rubrica>

          <h2><a href="#labs" class="header-anchor">#</a>Labs</h2>
          <Practicas></Practicas>

          <div style="text-align: center;">

            <h2>Comments<a href="#comments" class="header-anchor">#</a></h2>
            <Comments />

          </div>
        </div>
        
        <div
          v-if="lastUpdated"
          class="page-edit last-updated"
        >
          <span class="prefix">{{ lastUpdatedText }}:</span>
          <span class="time">{{ lastUpdated }}</span>
        </div>
 
        <PageNav v-bind="{ sidebarItems }" />

      </template>
    </PageLab>
  </div>
</template>

<script>
import Home from "@theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import PageLab from "@theme/components/PageLab.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import PageNav from "@theme/components/PageNav.vue";

import Rubrica from "@theme/components/Rubrica.vue";
import Practicas from "@theme/components/Practicas.vue";

import { resolveSidebarItems } from "../util";

export default {
  name: "Practica",

  components: {
    Home,
    PageLab,
    Sidebar,
    Navbar,
    PageNav,
    Rubrica,
    Practicas
  },

  data() {
    return {
      isSidebarOpen: false,
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },

    // Computed properties added by Casiano for the Practica Layout
    lastUpdated () {
      return this.$page.lastUpdated
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
};
</script>

<style lang="stylus">
.page-edit
  float right
  font-size 0.9em
  color #767676
  .prefix
    font-weight 500
    color lighten($textColor, 25%)
  .time
    font-weight 400
    color #767676

.rubrica {
  padding-bottom: 2rem;
  display: block;
}

</style>
