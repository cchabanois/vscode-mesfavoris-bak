export const bookmarksTreeJSObject = {
  "version": "1.0",
  "bookmarks": {
    "id": "63e5f673-fe2e-4358-a106-12925bc36d18",
    "properties": {
      "name": "Mes Favoris project"
    },
    "children": [
      {
        "id": "496407bd-52e3-42da-bff7-dc72644d9804",
        "properties": {
          "name": "build"
        },
        "children": [
          {
            "id": "29b299fb-9dbe-48e2-8a06-ee3f6b81b742",
            "properties": {
              "name": "maven"
            },
            "children": [
              {
                "id": "7c4c0ed0-823e-43ca-8239-a62f20f18dd6",
                "properties": {
                  "comment": "We use maven to build the project",
                  "filePath": "${MESFAVORIS}/pom.xml",
                  "git.branch": "master",
                  "git.projectPath": "",
                  "git.resourcePath": "pom.xml",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "lineContent": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
                  "lineNumber": "0",
                  "name": "pom.xml",
                  "projectName": "mesfavoris.root",
                  "workspacePath": "/mesfavoris.root/pom.xml"
                }
              },
              {
                "id": "730b19b4-a66a-45e3-97da-3319d6e922e1",
                "properties": {
                  "comment": "Tycho is a set of Maven plugins and extensions to build eclipse plugins",
                  "created": "2017-04-01T08:14:12.584Z",
                  "filePath": "${MESFAVORIS}/releng/mesfavoris.configuration/pom.xml",
                  "git.branch": "9a9b011b37065accf71d71844383b2a9102ff845",
                  "git.projectPath": "",
                  "git.resourcePath": "releng/mesfavoris.configuration/pom.xml",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "lineContent": "<groupId>org.eclipse.tycho</groupId>",
                  "lineNumber": "48",
                  "name": "pom.xml",
                  "projectName": "mesfavoris.root",
                  "workspacePath": "/mesfavoris.root/releng/mesfavoris.configuration/pom.xml"
                }
              },
              {
                "id": "8d6c3986-299b-4856-8672-39a2022a87c8",
                "properties": {
                  "comment": "this P2 repository contains our third party dependencies\n",
                  "folderPath": "${MESFAVORIS}/releng/dependencies/repository",
                  "git.branch": "master",
                  "git.projectPath": "",
                  "git.resourcePath": "releng/dependencies/repository",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "name": "repository",
                  "projectName": "mesfavoris.root",
                  "workspacePath": "/mesfavoris.root/releng/dependencies/repository"
                }
              }
            ]
          },
          {
            "id": "a2270c8e-9138-4788-85d8-2ff2c0aaad22",
            "properties": {
              "name": "travis"
            },
            "children": [
              {
                "id": "cf9e912b-e4b8-4f04-bb44-b262560f2131",
                "properties": {
                  "comment": "the project is built on travis",
                  "filePath": "${MESFAVORIS}/.travis.yml",
                  "git.branch": "master",
                  "git.projectPath": "",
                  "git.resourcePath": ".travis.yml",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "lineContent": "sudo: required",
                  "lineNumber": "1",
                  "name": ".travis.yml",
                  "projectName": "mesfavoris.root",
                  "workspacePath": "/mesfavoris.root/.travis.yml"
                }
              },
              {
                "id": "492d3340-eb6b-4d62-976c-1f896c484cfc",
                "properties": {
                  "favIcon": "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",
                  "name": "Travis CI - Test and Deploy Your Code with Confidence",
                  "url": "https://travis-ci.org/cchabanois/mesfavoris"
                }
              }
            ]
          },
          {
            "id": "4edb99f9-d9a3-493c-919a-e28f7840d5d3",
            "properties": {
              "name": "changelog"
            },
            "children": [
              {
                "id": "f97193c7-14a0-42a9-a27f-24beeacb1638",
                "properties": {
                  "created": "2018-03-05T20:43:23.096Z",
                  "filePath": "${MESFAVORIS}/CHANGELOG.md",
                  "git.branch": "master",
                  "git.projectPath": "",
                  "git.resourcePath": "CHANGELOG.md",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "lineContent": "# Change Log",
                  "lineNumber": "0",
                  "name": "CHANGELOG.md : # Change Log",
                  "projectName": "mesfavoris.root",
                  "workspacePath": "/mesfavoris.root/CHANGELOG.md"
                }
              },
              {
                "id": "d36e7c98-a88d-4b6f-8251-a083689e5d93",
                "properties": {
                  "comment": "generate logs",
                  "created": "2018-03-05T20:30:38.698Z",
                  "name": "github_changelog_generator --no-unreleased",
                  "snippet.content": "github_changelog_generator --no-unreleased"
                }
              },
              {
                "id": "e0a11aea-73f1-44ab-b716-3049d182d5e7",
                "properties": {
                  "git.branch": "master",
                  "git.projectPath": "",
                  "git.url": "https://github.com/skywinder/github-changelog-generator.git",
                  "icon": "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",
                  "name": "GitHub - skywinder/github-changelog-generator: Automatically generate change log from your tags, issues, labels and pull requests on GitHub.",
                  "url": "https://github.com/skywinder/github-changelog-generator"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "67a6cec5-1c6c-40bc-92f7-8b22c2cab9f3",
        "properties": {
          "name": "model"
        },
        "children": [
          {
            "id": "81c04486-7a8a-4e77-a438-bcf6d1c2a9ae",
            "properties": {
              "name": "bookmarks tree"
            },
            "children": [
              {
                "id": "c0c1bd51-00b3-440f-a96c-86f26d9686f1",
                "properties": {
                  "comment": "A bookmark is an immutable collection of properties and has an id",
                  "created": "2017-03-31T21:21:49.086Z",
                  "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/model/Bookmark.java",
                  "git.branch": "master",
                  "git.projectPath": "bundles/mesfavoris",
                  "git.resourcePath": "bundles/mesfavoris/src/mesfavoris/model/Bookmark.java",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "java.elementKind": "class",
                  "java.elementName": "Bookmark",
                  "java.lineNumberInsideElement": "0",
                  "java.type": "mesfavoris.model.Bookmark",
                  "lineContent": "public class Bookmark {",
                  "lineNumber": "8",
                  "name": "mesfavoris.model.Bookmark",
                  "projectName": "mesfavoris",
                  "workspacePath": "/mesfavoris/src/mesfavoris/model/Bookmark.java"
                }
              },
              {
                "id": "6cdd5efb-a2a6-4437-b195-6236265f285d",
                "properties": {
                  "comment": "Persistent (immutable) tree of bookmarks",
                  "created": "2017-03-29T13:01:30.494Z",
                  "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/model/BookmarksTree.java",
                  "git.branch": "master",
                  "git.projectPath": "bundles/mesfavoris",
                  "git.resourcePath": "bundles/mesfavoris/src/mesfavoris/model/BookmarksTree.java",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "java.elementKind": "class",
                  "java.elementName": "BookmarksTree",
                  "java.lineNumberInsideElement": "0",
                  "java.type": "mesfavoris.model.BookmarksTree",
                  "lineContent": "public class BookmarksTree implements Iterable<Bookmark> {",
                  "lineNumber": "27",
                  "name": "mesfavoris.model.BookmarksTree",
                  "projectName": "mesfavoris",
                  "workspacePath": "/mesfavoris/src/mesfavoris/model/BookmarksTree.java"
                }
              },
              {
                "id": "4adae814-43cf-4e4d-a59f-b9aa8a178ba3",
                "properties": {
                  "comment": "methods that add/remove/modify bookmarks return a new BookmarksTree",
                  "created": "2017-03-29T13:02:01.391Z",
                  "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/model/BookmarksTree.java",
                  "git.branch": "master",
                  "git.projectPath": "bundles/mesfavoris",
                  "git.resourcePath": "bundles/mesfavoris/src/mesfavoris/model/BookmarksTree.java",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "java.declaringType": "mesfavoris.model.BookmarksTree",
                  "java.elementKind": "method",
                  "java.elementName": "addBookmarks",
                  "java.lineNumberInsideElement": "0",
                  "java.methodSignature": "BookmarksTree addBookmarks(BookmarkId,List<Bookmark>)",
                  "lineContent": "public BookmarksTree addBookmarks(BookmarkId parentId, List<Bookmark> bookmarks) {",
                  "lineNumber": "100",
                  "name": "mesfavoris.model.BookmarksTree.addBookmarks()",
                  "projectName": "mesfavoris",
                  "workspacePath": "/mesfavoris/src/mesfavoris/model/BookmarksTree.java"
                }
              },
              {
                "id": "36da645b-8dd1-4ec5-b76b-d7734d45d92c",
                "properties": {
                  "comment": "we use javimmutable Persistent Collections",
                  "icon": "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",
                  "name": "GitHub - brianburton/java-immutable-collections: Efficient Immutable/Persistent Collections for Java",
                  "url": "https://github.com/brianburton/java-immutable-collections"
                }
              },
              {
                "id": "e173f11b-a42e-49be-bc5d-1a6477dfd0bd",
                "properties": {
                  "comment": "The current version of the BookmarksTree is stored in the BookmarkDatabase.",
                  "created": "2017-03-31T21:24:14.059Z",
                  "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/model/BookmarkDatabase.java",
                  "git.branch": "master",
                  "git.projectPath": "bundles/mesfavoris",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "java.elementKind": "class",
                  "java.elementName": "BookmarkDatabase",
                  "java.lineNumberInsideElement": "0",
                  "java.type": "mesfavoris.model.BookmarkDatabase",
                  "lineContent": "public class BookmarkDatabase {",
                  "lineNumber": "20",
                  "name": "mesfavoris.model.BookmarkDatabase",
                  "projectName": "mesfavoris",
                  "workspacePath": "/mesfavoris/src/mesfavoris/model/BookmarkDatabase.java"
                }
              },
              {
                "id": "ebe27e6f-de78-420d-860e-9f3c1659fdc1",
                "properties": {
                  "comment": "The bookmarksDatabase will be locked when you modify the tree",
                  "created": "2017-03-31T21:25:50.578Z",
                  "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/model/BookmarkDatabase.java",
                  "git.branch": "master",
                  "git.projectPath": "bundles/mesfavoris",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "java.declaringType": "mesfavoris.model.BookmarkDatabase",
                  "java.elementKind": "method",
                  "java.elementName": "modify",
                  "java.lineNumberInsideElement": "0",
                  "java.methodSignature": "void modify(IBookmarksOperation)",
                  "lineContent": "public void modify(IBookmarksOperation operation) throws BookmarksException {",
                  "lineNumber": "48",
                  "name": "mesfavoris.model.BookmarkDatabase.modify()",
                  "projectName": "mesfavoris",
                  "workspacePath": "/mesfavoris/src/mesfavoris/model/BookmarkDatabase.java"
                }
              }
            ]
          },
          {
            "id": "e40366a0-2d34-41cf-941c-32012fbe3cff",
            "properties": {
              "name": "changes"
            },
            "children": [
              {
                "id": "c17875f9-ef0b-4b25-a128-7c218e959687",
                "properties": {
                  "comment": "Changes to the bookmarkDatabase use a BookmarksTreeModifier",
                  "created": "2017-03-31T21:31:03.859Z",
                  "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/model/modification/BookmarksTreeModifier.java",
                  "git.branch": "master",
                  "git.projectPath": "bundles/mesfavoris",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "java.declaringType": "mesfavoris.model.modification.BookmarksTreeModifier",
                  "java.elementKind": "method",
                  "java.elementName": "addBookmarks",
                  "java.lineNumberInsideElement": "4",
                  "java.methodSignature": "void addBookmarks(BookmarkId,List<Bookmark>)",
                  "lineContent": "modifications.add(new BookmarksAddedModification(sourceTree, currentTree, parentId, bookmarks));",
                  "lineNumber": "26",
                  "name": "mesfavoris.model.modification.BookmarksTreeModifier.addBookmarks()",
                  "projectName": "mesfavoris",
                  "workspacePath": "/mesfavoris/src/mesfavoris/model/modification/BookmarksTreeModifier.java"
                }
              },
              {
                "id": "477db8fd-79a7-4006-a3b6-ef29aecb8db2",
                "properties": {
                  "comment": "When a change occurs, this listener is called",
                  "created": "2017-03-31T21:33:51.673Z",
                  "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/model/IBookmarksListener.java",
                  "git.branch": "master",
                  "git.projectPath": "bundles/mesfavoris",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "java.declaringType": "mesfavoris.model.IBookmarksListener",
                  "java.elementKind": "method",
                  "java.elementName": "bookmarksModified",
                  "java.lineNumberInsideElement": "0",
                  "java.methodSignature": "void bookmarksModified(List<BookmarksModification>)",
                  "lineContent": "public void bookmarksModified(List<BookmarksModification> modifications);",
                  "lineNumber": "8",
                  "name": "mesfavoris.model.IBookmarksListener.bookmarksModified()",
                  "projectName": "mesfavoris",
                  "workspacePath": "/mesfavoris/src/mesfavoris/model/IBookmarksListener.java"
                }
              },
              {
                "id": "8ad82c87-924e-4c66-8ccc-217fa14598f2",
                "properties": {
                  "comment": "You can get the sourceTree (tree before modifications) and targetTree (tree after modifications) for each kind of modifications ",
                  "created": "2017-03-31T21:32:28.429Z",
                  "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/model/modification/BookmarksAddedModification.java",
                  "git.branch": "master",
                  "git.projectPath": "bundles/mesfavoris",
                  "git.url": "https://github.com/cchabanois/mesfavoris.git",
                  "java.declaringType": "mesfavoris.model.modification.BookmarksAddedModification",
                  "java.elementKind": "method",
                  "java.elementName": "BookmarksAddedModification",
                  "java.lineNumberInsideElement": "0",
                  "java.methodSignature": "void BookmarksAddedModification(BookmarksTree,BookmarksTree,BookmarkId,List<Bookmark>)",
                  "lineContent": "public BookmarksAddedModification(BookmarksTree sourceTree, BookmarksTree targetTree, BookmarkId parentId,",
                  "lineNumber": "15",
                  "name": "mesfavoris.model.modification.BookmarksAddedModification.BookmarksAddedModification()",
                  "projectName": "mesfavoris",
                  "workspacePath": "/mesfavoris/src/mesfavoris/model/modification/BookmarksAddedModification.java"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "0999da72-cdf2-4c30-af15-5771b90846d1",
        "properties": {
          "name": "service"
        },
        "children": [
          {
            "id": "31617d4d-dd28-40c6-8616-fdf69e4b9645",
            "properties": {
              "comment": "Most of the operations can be done using the IBookmarksService",
              "created": "2017-04-01T08:02:02.141Z",
              "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/service/IBookmarksService.java",
              "git.branch": "update_changelog",
              "git.projectPath": "bundles/mesfavoris",
              "git.resourcePath": "bundles/mesfavoris/src/mesfavoris/service/IBookmarksService.java",
              "git.url": "https://github.com/cchabanois/mesfavoris.git",
              "java.elementKind": "interface",
              "java.elementName": "IBookmarksService",
              "java.lineNumberInsideElement": "0",
              "java.type": "mesfavoris.service.IBookmarksService",
              "lineContent": "public interface IBookmarksService {",
              "lineNumber": "16",
              "name": "mesfavoris.service.IBookmarksService",
              "projectName": "mesfavoris",
              "workspacePath": "/mesfavoris/src/mesfavoris/service/IBookmarksService.java"
            }
          },
          {
            "id": "2b92db21-4df0-4b0a-972a-fc4b1f350537",
            "properties": {
              "comment": "You can get the IBookmarksService using a static method from the MesFavoris class",
              "created": "2017-04-01T08:03:42.504Z",
              "filePath": "${MESFAVORIS}/bundles/mesfavoris/src/mesfavoris/MesFavoris.java",
              "git.branch": "update_changelog",
              "git.projectPath": "bundles/mesfavoris",
              "git.resourcePath": "bundles/mesfavoris/src/mesfavoris/MesFavoris.java",
              "git.url": "https://github.com/cchabanois/mesfavoris.git",
              "java.declaringType": "mesfavoris.MesFavoris",
              "java.elementKind": "method",
              "java.elementName": "getBookmarksService",
              "java.lineNumberInsideElement": "0",
              "java.methodSignature": "IBookmarksService getBookmarksService()",
              "lineContent": "public static IBookmarksService getBookmarksService() {",
              "lineNumber": "36",
              "name": "mesfavoris.MesFavoris.getBookmarksService()",
              "projectName": "mesfavoris",
              "workspacePath": "/mesfavoris/src/mesfavoris/MesFavoris.java"
            }
          }
        ]
      },
      {
        "id": "6ae10e4a-ae2f-4ca6-9e9b-00b6bcb93cae",
        "properties": {
          "favIcon": "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",
          "name": "GitHub - cchabanois/mesfavoris: Bookmarks eclipse plugin",
          "url": "https://github.com/cchabanois/mesfavoris"
        }
      }
    ]
  }
}