import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler, Config} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {MomentModule} from "angular2-moment";
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";
import {Section} from "../pages/home/section/section";
import {HtmlModal} from "../components/HtmlModal/HtmlModal";
import {SanitizeHtml} from "../pipes/SanitizeHtml.pipe";
import {BookListModal} from "../components/BookListModal/BookListModal";
import {TodoModal} from "../components/TodoModal/TodoModal";
import {SkillModal} from "../components/SkillModal/SkillModal";
import {Ionic2RatingModule} from "ionic2-rating";
import {DiscoverPage} from "../pages/discover/discover";
import {ArticleDetailPage} from "../pages/discover/article-detail/article-detail";
import {ArticleListPage} from "../pages/discover/article-list/article-list";
import {ChapterDetailPage} from "../pages/discover/chapter-detail/chapter-detail";
import {ChapterListPage} from "../pages/discover/chapter-list/chapter-list";
import {ProjectDetailPage} from "../pages/discover/project-detail/project-detail";
import {ProjectListPage} from "../pages/discover/project-list/project-list";
import {RecommendArticles} from "../pages/discover/recommend-articles/recommend-articles";
import {RecommendBook} from "../pages/discover/recommend-books/recommend-books";
import {RoadMapDetailPage} from "../pages/discover/roadmap-detail/roadmap-detail";
import {RoadMapPage} from "../pages/discover/roadmap-list/roadmap-list";
import {SolutionPage} from "../pages/discover/solution/solution";
import {TWBookPage} from "../pages/discover/thoughtworks-books/thoughtworks-books";
import {TodoListsPage} from "../pages/discover/todo-lists/todo-lists";
import {ToolboxDetailPage} from "../pages/discover/toolbox-detail/toolbox-detail";
import {ToolboxListPage} from "../pages/discover/toolbox-list/toolbox-list";
import {ExamListPage} from "../pages/discover/exam-list/exam-list";
import {ExamDetailPage} from "../pages/discover/exam-detail/exam-detail";
import {PagingComponent} from "../pages/effect/paging-conponents";
import {PopoverPage} from "../pages/discover/solution/popover-page";
import {BodyContent} from "../pages/discover/exam-detail/body-content";
import {PageOne} from "../pages/discover/exam-detail/content-one";
import {UserCenterPage} from "../pages/user-center/user-center";
import {AboutUsPage} from "../pages/user-center/about-us/about-us";
import {BookmarksPage} from "../pages/user-center/bookmarks/bookmarks";
import {SkillListPage} from "../pages/user-center/skill-list/skill-list";
import {Profile} from "../pages/user-center/about-us/profile/profile";
import {UserData} from "../services/user-data";
import {CommunityDetailPage} from "../pages/community/detail/community-detail";
import {CommunityPage} from "../pages/community/community";
import {UserProfilePage} from "../pages/community/profile/user-profile";
import {CreateTopicPage} from "../pages/community/create/create-topic";
import {DomainDetailPage} from "../pages/discover/thoughtworks-books/domain-detail-page/domain-detail-page";
import {SkillTreePage} from "../pages/skill-tree/skill-tree";
import {SkillTreeModal} from "../components/SkillTreeModal/SkillTreeModal";
import {DonatePage} from "../pages/user-center/donate/donate";

@NgModule({
  declarations: [
    MyApp,
    DiscoverPage,
    HomePage,
    Section,
    HtmlModal,
    TodoModal,
    SkillModal,
    BookListModal,
    SanitizeHtml,
    ArticleDetailPage,
    ArticleListPage,
    ChapterListPage,
    ChapterDetailPage,
    ProjectDetailPage,
    ProjectListPage,
    RecommendArticles,
    RecommendBook,
    RoadMapDetailPage,
    RoadMapPage,
    SolutionPage,
    TWBookPage,
    TodoListsPage,
    ToolboxDetailPage,
    ExamListPage,
    ExamDetailPage,
    ToolboxListPage,
    PagingComponent,
    PopoverPage,
    BodyContent,
    PageOne,
    UserCenterPage,
    AboutUsPage,
    BookmarksPage,
    SkillListPage,
    Profile,
    CommunityPage,
    UserProfilePage,
    CreateTopicPage,
    CommunityDetailPage,
    DomainDetailPage,
    SkillTreePage,
    SkillTreeModal,
    DonatePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabbarPlacement: "bottom",
      backButtonText: "后退",
      tabsHideOnSubPages: true,
      tabsHighlight: true
    }),
    MomentModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiscoverPage,
    HomePage,
    Section,
    BookListModal,
    HtmlModal,
    TodoModal,
    SkillModal,
    ArticleDetailPage,
    ArticleListPage,
    ChapterListPage,
    ChapterDetailPage,
    ProjectDetailPage,
    ProjectListPage,
    RecommendArticles,
    RecommendBook,
    RoadMapDetailPage,
    RoadMapPage,
    SolutionPage,
    TWBookPage,
    TodoListsPage,
    ToolboxDetailPage,
    ToolboxListPage,
    ExamListPage,
    ExamDetailPage,
    PopoverPage,
    BodyContent,
    PageOne,
    UserCenterPage,
    AboutUsPage,
    BookmarksPage,
    SkillListPage,
    Profile,
    CommunityPage,
    UserProfilePage,
    CreateTopicPage,
    CommunityDetailPage,
    DomainDetailPage,
    SkillTreePage,
    SkillTreeModal,
    DonatePage,
    TabsPage
  ],
  providers: [
    UserData,
    Storage,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {
  constructor(private config: Config) {

  }
}
