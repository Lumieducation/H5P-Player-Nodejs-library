const content_type_cache = {
    outdated: false,
    libraries: [
        {
            id: 1,
            machineName: 'H5P.Accordion',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 19,
            h5pMajorVersion: 1,
            h5pMinorVersion: 5,
            title: 'Accordion',
            summary: 'Create vertically stacked expandable items',
            description:
                'Reduce the amount of text presented to readers by using this responsive accordion. Readers decide which headlines to take a closer look at by expanding the title. Excellent for providing an overview with optional in-depth explanations.',
            icon: 'https://h5p.org/sites/default/files/accordion.svg',
            createdAt: 1488282378,
            updatedAt: 1546846163,
            isRecommended: false,
            popularity: 12,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/accordion-01.png?itok=qnXarBZ5',
                    alt: 'Collapsed'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/accordion-02.png?itok=lnTobl4C',
                    alt: 'Expanded'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: [],
            keywords: ['accordion', 'collapsible text'],
            example: 'https://h5p.org/accordion'
        },
        {
            id: 2,
            machineName: 'H5P.ArithmeticQuiz',
            majorVersion: 1,
            minorVersion: 1,
            patchVersion: 8,
            h5pMajorVersion: 1,
            h5pMinorVersion: 0,
            title: 'Arithmetic Quiz',
            summary: 'Create time-based arithmetic quizzes',
            description:
                'Create arithmetic quizzes consisting of multiple choice questions. As an author, all you have to do is decide the type and length of the quiz. Users keep track of score and time spent when solving the quiz.',
            icon: 'https://h5p.org/sites/default/files/arithmetic%20quiz.svg',
            createdAt: 1488283418,
            updatedAt: 1491464429,
            isRecommended: false,
            popularity: 30,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/arithmetic-quiz-01.png?itok=w00QVe4N',
                    alt: 'Arithmetic quiz start screen'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/arithmetic-quiz-02.png?itok=k6nal6kx',
                    alt: 'Arithmetic quiz question'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/arithmetic-quiz-03.png?itok=oHISx8VF',
                    alt: 'Arithmetic quiz correct answer given'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/arithmetic-quiz-04.png?itok=JIcoDl58',
                    alt: 'Arithmetic quiz end screen'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Games', 'Questions'],
            keywords: ['math', 'arithmetic quiz', 'countdown'],
            example: 'https://h5p.org/arithmetic-quiz'
        },
        {
            id: 3,
            machineName: 'H5P.Chart',
            majorVersion: 1,
            minorVersion: 2,
            patchVersion: 12,
            h5pMajorVersion: 1,
            h5pMinorVersion: 0,
            title: 'Chart',
            summary: 'Quickly generate bar and pie charts',
            description:
                'Need to present simple statistical data graphically without creating the artwork manually? Chart is your answer.',
            icon: 'https://h5p.org/sites/default/files/chart.svg',
            createdAt: 1488283592,
            updatedAt: 1491465031,
            isRecommended: false,
            popularity: 36,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/arithmetic-quiz-01_0.png?itok=iRQawZtl',
                    alt: 'Pie chart view'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/arithmetic-quiz-02_0.png?itok=6G-3NLs-',
                    alt: 'Bar chart view'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/arithmetic-quiz-03_0.png?itok=dGg4KIiV',
                    alt: 'Bar chart view'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia'],
            keywords: ['chart', 'bar chart', 'pie chart', 'graph'],
            example: 'https://h5p.org/chart'
        },
        {
            id: 4,
            machineName: 'H5P.Collage',
            majorVersion: 0,
            minorVersion: 3,
            patchVersion: 9,
            h5pMajorVersion: 1,
            h5pMinorVersion: 7,
            title: 'Collage',
            summary: 'Create a collage of multiple images',
            description:
                'The Collage tool allows you to organize images into a soothing composition. ',
            icon: 'https://h5p.org/sites/default/files/college.svg',
            createdAt: 1488374773,
            updatedAt: 1541164481,
            isRecommended: false,
            popularity: 27,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/collage-04_0.png?itok=Ix3CDsjz',
                    alt: 'Collage editor with no images'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/collage-03_0.png?itok=idf9cgYV',
                    alt: 'Collage editor with three images'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/collage-01_0.png?itok=-UtwiYRz',
                    alt: 'A collage containing 3 images of flowers'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/collage-02_0.png?itok=aTHRDus1',
                    alt: 'A collage containing 4 images of snowy mountains'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia'],
            keywords: ['collage', 'image'],
            example: 'https://h5p.org/collage'
        },
        {
            id: 5,
            machineName: 'H5P.Column',
            majorVersion: 1,
            minorVersion: 8,
            patchVersion: 4,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Column',
            summary: 'Organize H5P content into a column layout',
            description:
                'Organize your content type into a column layout with H5P Column. Content types that address similar material or share a common theme can now be grouped together to create a coherent learning experience. In addition, authors are free to be creative by combining almost all of the existing H5P content types.',
            icon: 'https://h5p.org/sites/default/files/column.svg',
            createdAt: 1488375032,
            updatedAt: 1544110401,
            isRecommended: false,
            popularity: 8,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/column-01.png?itok=37ibbzhk',
                    alt:
                        'A column containing an image, a text block and a question'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/column-02.png?itok=e2km4R4C',
                    alt: 'A column containing different content types'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/column-03.png?itok=nilYMNyC',
                    alt: 'A drag and drop inside a column'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['column', 'layout', 'compound'],
            example: 'https://h5p.org/column'
        },
        {
            id: 6,
            machineName: 'H5P.CoursePresentation',
            majorVersion: 1,
            minorVersion: 20,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Course Presentation',
            summary: 'Create a presentation with interactive slides',
            description:
                'Course presentations consist of slides with multimedia, text, and many different types of interactions like interactive summaries, multiple choice questions and interactive videos. Learners can experience new interactive learning material and test their knowledge and memory in Course Presentations. As always with H5P, content is editable in web browsers, and the Course Presentation activity type includes a WYSIWYG drag and drop based authoring tool. A typical use of the Course Presentation activity is to use a few slides to introduce a subject and follow these with a few more slides in which the user\u2019s knowledge is tested. Course Presentations may however be used in many different ways, including as a presentation tool for use in the classroom, or as a game where the usual navigation is replaced with navigation buttons on top of the slides to let the user make choices and see the consequences of their choices.',
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.CoursePresentation-1.20/icon.svg',
            createdAt: 1488375267,
            updatedAt: 1544784492,
            isRecommended: true,
            popularity: 1,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/course-presentation-01.png?itok=ilSK_sEu',
                    alt: 'Adding an image to the editor'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/course-presentation-02_0.png?itok=NrkD9l5t',
                    alt: 'A single Choice Set inside the editor'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/course-presentation-03.png?itok=cJiwaVzi',
                    alt:
                        'A single Choice Set and an image of a cloudberry inside the editor'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/course-presentation-04_0.png?itok=CIQbHd-t',
                    alt:
                        'First slide of a presentation containing text and a clickable image'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/course-presentation-05_0.png?itok=z-6dFoL1',
                    alt: 'Summary slide'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/course-presentation-06_0.png?itok=gHNw6Vt0',
                    alt: 'Active surface mode'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/course-presentation-07_0.png?itok=oAOD70di',
                    alt: 'A slide containing video and text'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['course presentation', 'slides', 'powerpoint'],
            tutorial: 'https://h5p.org/tutorial-course-presentation',
            example: 'https://h5p.org/presentation',
            localMajorVersion: 1,
            localMinorVersion: 20,
            localPatchVersion: 2
        },
        {
            id: 7,
            machineName: 'H5P.Dialogcards',
            majorVersion: 1,
            minorVersion: 7,
            patchVersion: 7,
            h5pMajorVersion: 1,
            h5pMinorVersion: 15,
            title: 'Dialog Cards',
            summary: 'Create text-based turning cards',
            description:
                "Dialog cards can be used as a drill to help learners memorize words, expressions or sentences. On the front of the card, there's a hint for a word or expression. By turning the card the learner reveals a corresponding word or expression. Dialog cards can be used in language learning, to present math problems or help learners remember facts such as historical events, formulas or names.",
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.Dialogcards-1.7/icon.svg',
            createdAt: 1488375538,
            updatedAt: 1546846163,
            isRecommended: true,
            popularity: 13,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/dialog-cards-01_0.png?itok=OgMQk8D5',
                    alt: 'Dialog card - front'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/dialog-cards-02_0.png?itok=Pv49ouxC',
                    alt: 'Dialog card - back'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/dialog-cards-03.png?itok=8wwQDVUw',
                    alt: 'Dialog card - front'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/dialog-cards-04.png?itok=8VFY5QY3',
                    alt: 'Dialog card - back'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['dialog cards'],
            tutorial: 'https://h5p.org/tutorial-dialog-cards',
            example: 'https://h5p.org/dialog-cards',
            localMajorVersion: 1,
            localMinorVersion: 7,
            localPatchVersion: 3
        },
        {
            id: 8,
            machineName: 'H5P.DocumentationTool',
            majorVersion: 1,
            minorVersion: 8,
            patchVersion: 0,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Documentation Tool',
            summary: 'Create a form wizard with text export',
            description:
                'The documentation tool aims to make it easy to create assessment wizards for goal driven activities. It can also be used as a form wizard. While editing, the author can add multiple steps to the wizard. In each step, the author can define which content goes into that step. Content can be plain text, input fields, goal definition and goal assessment. Once published, the end user will be taken through the steps of the wizard. On the last step of the wizard, the user can generate a document with all the input that has been submitted. This document can be downloaded. The Documentation tool is fully responsive and works great on smaller screens as well as on your desktop.',
            icon:
                'https://h5p.org/sites/default/files/documentation%20tool%20.svg',
            createdAt: 1488375711,
            updatedAt: 1546436140,
            isRecommended: false,
            popularity: 15,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/documentation-tool-01.png?itok=mIhHTIX3',
                    alt: "User's view \u2013 document your project"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/documentation-tool-02.png?itok=WCPC1IpT',
                    alt: "User's view \u2013 Goals"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/documentation-tool-03.png?itok=GWEa3LZf',
                    alt: "User's view \u2013 Done"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/documentation-tool-04.png?itok=yFf2Qa-n',
                    alt: "User's view \u2013 Document your project"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['dialog cards'],
            tutorial: 'https://h5p.org/tutorial-documentation-tool',
            example: 'https://h5p.org/documentation-tool'
        },
        {
            id: 9,
            machineName: 'H5P.DragQuestion',
            majorVersion: 1,
            minorVersion: 13,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Drag and Drop',
            summary: 'Create drag and drop tasks with images',
            description:
                'Drag and drop question enables the learner to associate two or more elements and to make logical connections in a visual way. Create Drag and drop questions using both text and images as draggable alternatives. H5P Drag and drop questions support one-to-one, one-to-many, many-to-one and many-to-many relations between questions and answers. ',
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.DragQuestion-1.13/icon.svg',
            createdAt: 1488376151,
            updatedAt: 1546846163,
            isRecommended: false,
            popularity: 6,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-and-drop-01.png?itok=xS6wYXCj',
                    alt:
                        'A drag and drop with one dropzone (strawberry) and three draggables'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-and-drop-03.png?itok=BMTD9pmT',
                    alt:
                        'A drag and drop where the learner shall match flags and country names'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-and-drop-04.png?itok=_QbzXvhm',
                    alt:
                        'A drag and drop where the learner shall match images of berries with their names'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-and-drop-02.png?itok=xcDAfXTD',
                    alt:
                        'A drag and drop where the learner shall drag verbs, adjectives and nouns in the correct places'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-and-drop-06.png?itok=jONaT2bA',
                    alt:
                        'A drag and drop where the learner shall place the draggables on spots on the background image'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-and-drop-05.png?itok=wngjR93X',
                    alt: 'The drag and drop result view'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['drag and drop'],
            tutorial: 'https://h5p.org/tutorial-drag-and-drop-question',
            example: 'https://h5p.org/drag-and-drop',
            localMajorVersion: 1,
            localMinorVersion: 13,
            localPatchVersion: 2
        },
        {
            id: 10,
            machineName: 'H5P.DragText',
            majorVersion: 1,
            minorVersion: 8,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Drag the Words',
            summary: 'Create text-based drag and drop tasks',
            description:
                "Drag the Words allows content designers to create textual expressions with missing pieces of text. The end user drags a missing piece of text to its correct place, to form a complete expression. May be used to check if the user remembers a text she has read, or if she understands something. Helps the user think through a text. It's super easy to create a drag the words task. The editor just writes the text and encloses the words that are to be draggable with asterisk signs like *draggableWord*.",
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.DragText-1.8/icon.svg',
            createdAt: 1488376477,
            updatedAt: 1546846163,
            isRecommended: true,
            popularity: 3,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-the-words-01.png?itok=dpMCvPPe',
                    alt: 'Drag text - initial state.'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-the-words-02.png?itok=njr_aEqB',
                    alt: 'Drag text after clicking the "check" button'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/drag-the-words-03.png?itok=2xeHtKBa',
                    alt: 'Tip in drag text'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['drag', 'words'],
            tutorial:
                'https://h5p.org/documentation/content-author-guide/tutorials-for-authors/drag-the-words',
            example: 'https://h5p.org/drag-the-words',
            localMajorVersion: 1,
            localMinorVersion: 8,
            localPatchVersion: 2
        },
        {
            id: 11,
            machineName: 'H5P.Blanks',
            majorVersion: 1,
            minorVersion: 11,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Fill in the Blanks',
            summary: 'Create a task with missing words in a text',
            description:
                "Learners fill in the missing words in a text. The learner is shown a solution after filling in all the missing words, or after each word depending on settings. Authors enter text and mark words to be replaced with an asterix. In addition to native and second language learning, Fill in the blanks can be used to test the learner's ability to reproduce facts or produce mathematical inferences.",
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.Blanks-1.11/icon.svg',
            createdAt: 1488376747,
            updatedAt: 1542664138,
            isRecommended: false,
            popularity: 4,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/fill-in-the-blanks-01.png?itok=EwyBhMVL',
                    alt: "The student's initial view - empty blanks"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/fill-in-the-blanks-02.png?itok=ByI6y9m-',
                    alt: 'The result view showing corrects and wrongs'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/fill-in-the-blanks-03.png?itok=49rZ2yTY',
                    alt: 'Tip inside blanks'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/fill-in-the-blanks-04.png?itok=m8MnJh16',
                    alt:
                        'A blank with "Automatically check answers after input" enabled'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: true,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['fill', 'blanks', 'text'],
            tutorial: 'https://h5p.org/tutorial-fill-in-the-blanks',
            example: 'https://h5p.org/fill-in-the-blanks',
            localMajorVersion: 1,
            localMinorVersion: 11,
            localPatchVersion: 3
        },
        {
            id: 12,
            machineName: 'H5P.ImageHotspotQuestion',
            majorVersion: 1,
            minorVersion: 8,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Find the Hotspot',
            summary: 'Create image hotspots for users to find',
            description:
                'This content type allows end users to press somewhere on an image and get feedback on whether that was correct or incorrect according to the task description. The author uploads an image and defines various hotspots corresponding to details or sections of the image. Hotspots can either be defined as correct or incorrect, and the author provides appropriate feedback text in both cases. The author can also define a feedback if the end user presses somewhere which is neither defined as a correct nor incorrect hotspot.',
            icon:
                'https://h5p.org/sites/default/files/find%20the%20hotspot.svg',
            createdAt: 1488377636,
            updatedAt: 1546846163,
            isRecommended: false,
            popularity: 20,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/find-the-hotspot-01.png?itok=G5zJHEh0',
                    alt: "Learner's view - correct answer is selected"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/find-the-hotspot-02.png?itok=mNIZ5J08',
                    alt: 'Editor view'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['find', 'hotspot', 'image'],
            example: 'https://h5p.org/image-hotspot-question'
        },
        {
            id: 13,
            machineName: 'H5P.GuessTheAnswer',
            majorVersion: 1,
            minorVersion: 4,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Guess the Answer',
            summary: 'Create an image with a question and answer',
            description:
                'This content type allows authors to upload an image and add a suitable description. End users can guess the answer and press the bar below the image to reveal the correct answer.',
            icon:
                'https://h5p.org/sites/default/files/guess%20the%20answer.svg',
            createdAt: 1488377905,
            updatedAt: 1546846163,
            isRecommended: false,
            popularity: 29,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/guess-the-answer-01.png?itok=cKWhsf7W',
                    alt: "Learner's initial view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/guess-the-answer-02.png?itok=k9g-O8UW',
                    alt: "Learner's view revealing the correct answer"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['guess', 'answer'],
            tutorial:
                'https://h5p.org/documentation/content-author-guide/tutorials-for-authors/guess-the-answer',
            example: 'https://h5p.org/guess-the-answer'
        },
        {
            id: 14,
            machineName: 'H5P.IFrameEmbed',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 21,
            h5pMajorVersion: 1,
            h5pMinorVersion: 0,
            title: 'Iframe Embedder',
            summary: 'Embed from a url or a set of files',
            description:
                'The Iframe embedder makes it easy to make an H5P of already existing JavaScript applications.',
            icon: 'https://h5p.org/sites/default/files/iframe%20embedder.svg',
            createdAt: 1488378484,
            updatedAt: 1491475605,
            isRecommended: false,
            popularity: 16,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/iFrame-embedder-01.png?itok=CehXfNpd',
                    alt: "End user's view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/iFrame-embedder-02.png?itok=p5V0tHcY',
                    alt: "End user's view"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['embed', 'iframe'],
            example: 'https://h5p.org/iframe-embedder'
        },
        {
            id: 15,
            machineName: 'H5P.InteractiveVideo',
            majorVersion: 1,
            minorVersion: 20,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Interactive Video',
            summary: 'Create videos enriched with interactions',
            description:
                "Add interactivity to your video with explanations, extra pictures, tables, Fill in the Blank and multiple choice questions. Quiz questions support adaptivity, meaning that you can jump to another part of the video based on the user's input.  Interactive summaries can be added at the end of the video. Interactive videos are created and edited using the H5P authoring tool in a standard web browser.",
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.InteractiveVideo-1.20/icon.svg',
            createdAt: 1488379462,
            updatedAt: 1546959432,
            isRecommended: false,
            popularity: 2,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/interactive-video-01.png?itok=WgAmEzb0',
                    alt: 'Interactive video start screen'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/interactive-video-02.png?itok=9P0-eiaB',
                    alt: 'The editor with a multiple choice question'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/interactive-video-03.png?itok=2X03y0pe',
                    alt: 'Inside the editor showing the multiple choice editor'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/interactive-video-04.png?itok=NtKe_dhK',
                    alt: 'Bookmarks menu'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/interactive-video-05.png?itok=Xy-1r3Dt',
                    alt: 'Drag and drop inside the video'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/interactive-video-06.png?itok=aVysZc0i',
                    alt: 'Summary at the end of the video'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['interactive', 'video'],
            tutorial: 'https://h5p.org/tutorial-interactive-video',
            example: 'https://h5p.org/interactive-video',
            localMajorVersion: 1,
            localMinorVersion: 20,
            localPatchVersion: 2
        },
        {
            id: 16,
            machineName: 'H5P.MarkTheWords',
            majorVersion: 1,
            minorVersion: 9,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Mark the Words',
            summary: 'Create a task where users highlight words',
            description:
                'Mark the words allows content designers to create textual expressions with a defined set of correct words. The end user highlights words according to the task description and is given a score. For the editor it is super easy to create a click the words challenge. The editor types in the text and encloses the words that the user is supposed to click, the right answers, in asterix like *correctWord*.',
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.MarkTheWords-1.9/icon.svg',
            createdAt: 1488379610,
            updatedAt: 1542876320,
            isRecommended: false,
            popularity: 11,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/mark-the-words-01_0.png?itok=FTe4BK8x',
                    alt: "Learner's initial view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/mark-the-words-03_0.png?itok=veoD8bpQ',
                    alt: "Learner's view - showing solution"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: true,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['mark', 'words'],
            tutorial:
                'https://h5p.org/documentation/content-author-guide/tutorials-for-authors/mark-the-words',
            example: 'https://h5p.org/mark-the-words',
            localMajorVersion: 1,
            localMinorVersion: 9,
            localPatchVersion: 3
        },
        {
            id: 17,
            machineName: 'H5P.MemoryGame',
            majorVersion: 1,
            minorVersion: 3,
            patchVersion: 0,
            h5pMajorVersion: 1,
            h5pMinorVersion: 0,
            title: 'Memory Game',
            summary: 'Create the classic image pairing game',
            description:
                "Create your own memory games and test the memory of your site's users with this simple yet beautiful HTML5 game.",
            icon: 'https://h5p.org/sites/default/files/memmory%20game.svg',
            createdAt: 1488379742,
            updatedAt: 1491477891,
            isRecommended: false,
            popularity: 9,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/memmory-game-02.png?itok=wrU2ytID',
                    alt: "Student's view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/memmory-game-03.png?itok=dCb0YlGe',
                    alt: "Student's view - feedback after the match"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/memmory-game-01.png?itok=AeOPD5HE',
                    alt: "Student's view - matching two different images"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['memory', 'game', 'cards'],
            tutorial:
                'https://h5p.org/documentation/content-author-guide/tutorials-for-authors/memory-game',
            example: 'https://h5p.org/memory-game'
        },
        {
            id: 18,
            machineName: 'H5P.MultiChoice',
            majorVersion: 1,
            minorVersion: 13,
            patchVersion: 2,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Multiple Choice',
            summary: 'Create flexible multiple choice questions',
            description:
                'Multiple Choice questions can be an effective assesment tool. The learner is given immediate performance feedback. The H5P Multiple Choice questions can have a single or multiple correct options per question.',
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.MultiChoice-1.13/icon.svg',
            createdAt: 1488379865,
            updatedAt: 1541164481,
            isRecommended: false,
            popularity: 0,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/multiple-choice-01.png?itok=CiwAg_Sn',
                    alt: "Learner's initial view (radio buttons)"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/multiple-choice-02.png?itok=f5hGmJWk',
                    alt: 'Learner answered correct'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/multiple-choice-03.png?itok=R7zb6rTZ',
                    alt: "Learner's initial view (check buttons)"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/multiple-choice-04.png?itok=eSNsVzFo',
                    alt: 'Learner has clicked the "check" button'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: true,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['multiple', 'choice', 'quiz'],
            tutorial: 'https://h5p.org/tutorial-multichoice-question',
            example: 'https://h5p.org/multichoice',
            localMajorVersion: 1,
            localMinorVersion: 13,
            localPatchVersion: 2
        },
        {
            id: 19,
            machineName: 'H5P.PersonalityQuiz',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 8,
            h5pMajorVersion: 1,
            h5pMinorVersion: 0,
            title: 'Personality Quiz',
            summary: 'Create personality quizzes',
            description:
                'In this content type, the author defines a series of questions with alternatives, where each alternative is matched against one or more personalities. At the end of the quiz, the end user will see which personality matches the best. There are several ways of making this quiz visually appealing, by eg. representing questions, alternatives, and personalities using images.',
            icon: 'https://h5p.org/sites/default/files/personality%20quiz.svg',
            createdAt: 1488380090,
            updatedAt: 1491487592,
            isRecommended: false,
            popularity: 25,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/personality-quiz-01.png?itok=ygSGXtZF',
                    alt: "Student's view - starting screen"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/personality-quiz-02.png?itok=79jwUFNT',
                    alt: "Student's view - question 1"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/personality-quiz-03.png?itok=lDhEO4KA',
                    alt: "Student's view - question 2"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/personality-quiz-04.png?itok=1zBGhax9',
                    alt: "Student's view - question 3"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/personality-quiz-05.png?itok=rdoNJ4-j',
                    alt: "Student's view - end screen"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Lumenia',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['personality', 'quiz'],
            example: 'https://h5p.org/personality-quiz'
        },
        {
            id: 20,
            machineName: 'H5P.Questionnaire',
            majorVersion: 1,
            minorVersion: 2,
            patchVersion: 9,
            h5pMajorVersion: 1,
            h5pMinorVersion: 0,
            title: 'Questionnaire',
            summary: 'Create a questionnaire to receive feedback',
            description:
                "Gain feedback and ask open ended questions in Interactive Videos and other content types with Questionnaire. Questionnaire makes the user's answers available via an xAPI integration. This means that website owners may store the answers in many different ways. Answers may be stored in an LRS, the sites own custom storage or a script can fetch the e-mail address and use it to send the user an e-mail. On H5P.org answers are stored in Google Analytics.",
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.Questionnaire-1.2/icon.svg',
            createdAt: 1488380236,
            updatedAt: 1491487615,
            isRecommended: false,
            popularity: 37,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/questionnaire-01.png?itok=zVNElQ9C',
                    alt: "Student's view - question 1"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/questionnaire-02.png?itok=SdSQGHbW',
                    alt: "Student's view - question 2"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/questionnaire-03.png?itok=sNnbfkv_',
                    alt: "Student's view - question 3"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/questionnaire-04.png?itok=J8eZGmV0',
                    alt: "Student's view - end screen"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: true,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['questionnaire'],
            example: 'https://h5p.org/questionnaire',
            localMajorVersion: 1,
            localMinorVersion: 2,
            localPatchVersion: 8
        },
        {
            id: 21,
            machineName: 'H5P.QuestionSet',
            majorVersion: 1,
            minorVersion: 16,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Quiz (Question Set)',
            summary: 'Create a sequence of various question types',
            description:
                'Question Set is your typical quiz content type. It allows the learner to solve a sequence of various question types such as Multichoice, Drag and drop and Fill in the blanks in a Question set. As an author, there are many settings you can use to make it behave just the way you want it to. You may, for instance, customize the Question set with background images and define a pass percentage for the learner. The Question Set also allows you to add videos that are played at the end. One video for success, another if the learner fails the test. This might motivate learners to try again if they fail so that they get to see the success video.',
            icon: 'https://h5p.org/sites/default/files/question-set.svg',
            createdAt: 1488380337,
            updatedAt: 1546846163,
            isRecommended: false,
            popularity: 5,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/question-set-01.png?itok=7xWQV7Vm',
                    alt: 'A multiple choice inside a question set'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/question-set-02_0.png?itok=ku46xHQX',
                    alt: 'A drag and drop inside a question set'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/question-set-03.png?itok=n1cnLs5j',
                    alt: 'A multiple choice inside a question set'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/question-set-04.png?itok=TrmmsdwT',
                    alt: 'The summary page'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['question set', 'collection', 'quiz'],
            tutorial: 'https://h5p.org/tutorial-question-set',
            example: 'https://h5p.org/question-set'
        },
        {
            id: 22,
            machineName: 'H5P.SingleChoiceSet',
            majorVersion: 1,
            minorVersion: 11,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Single Choice Set',
            summary: 'Create questions with one correct answer',
            description:
                'Single choice set allows content designers to create question sets with one correct answer per question. The end user gets immediate feedback after submitting each answer.',
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.SingleChoiceSet-1.11/icon.svg',
            createdAt: 1488380512,
            updatedAt: 1547046678,
            isRecommended: false,
            popularity: 14,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/single-choice-set-01.png?itok=IzXoN6tp',
                    alt: "Learner's initial view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/single-choice-set-02.png?itok=yrj9-jB0',
                    alt: 'Correct answer given for an alternative'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/single-choice-set-03.png?itok=o-b5R46U',
                    alt: 'Summary page'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/single-choice-set-04.png?itok=0BlfuOy3',
                    alt: 'Showing solution'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['collection', 'quiz', 'choice'],
            tutorial:
                'https://h5p.org/documentation/content-author-guide/tutorials-for-authors/single-choice-set',
            example: 'https://h5p.org/single-choice-set',
            localMajorVersion: 1,
            localMinorVersion: 11,
            localPatchVersion: 2
        },
        {
            id: 23,
            machineName: 'H5P.Summary',
            majorVersion: 1,
            minorVersion: 10,
            patchVersion: 2,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Summary',
            summary: 'Create tasks with a list of statements',
            description:
                'Summaries help the learner remember key information in a text, video or presentation, by actively buliding a summary about the topic at hand. When the learner has completed a summary, a complete list of key statements about the topic is shown.',
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.Summary-1.10/icon.svg',
            createdAt: 1488380637,
            updatedAt: 1541164481,
            isRecommended: false,
            popularity: 26,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/summary-01.png?itok=ICk8qnxS',
                    alt: "Learner's initial view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/summary-02.png?itok=DY9wdA0S',
                    alt: 'Wrong answer given'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/summary-03.png?itok=nWaNT-Ll',
                    alt: 'First correct statement found'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/summary-04.png?itok=EYtv3B7n',
                    alt: 'Second correct statement found'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/summary-05.png?itok=tVHuEHqv',
                    alt: 'Summary'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: true,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['summary'],
            tutorial: 'https://h5p.org/tutorial-summary',
            example: 'https://h5p.org/summary',
            localMajorVersion: 1,
            localMinorVersion: 10,
            localPatchVersion: 2
        },
        {
            id: 24,
            machineName: 'H5P.Timeline',
            majorVersion: 1,
            minorVersion: 1,
            patchVersion: 15,
            h5pMajorVersion: 1,
            h5pMinorVersion: 0,
            title: 'Timeline',
            summary: 'Create a timeline of events with multimedia',
            description:
                'This is Timeline.js developed by Knight Lab, packaged as an H5P content type in order to make timelines easily editable, shareable and reuseable. The Timeline content type allows you to place a sequence of events in a chronological order. For each event you may add images and texts. You may also include assets from Twitter, YouTube, Flickr, Vimeo, Google Maps and SoundCloud.',
            icon: 'https://h5p.org/sites/default/files/timeline.svg',
            createdAt: 1488380771,
            updatedAt: 1491481225,
            isRecommended: false,
            popularity: 19,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/timeline-01.png?itok=6BO75od2',
                    alt: "Student's view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/timeline-02.png?itok=-SsDe4Zb',
                    alt: "Student's view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/timeline-03.png?itok=Fmbxyxix',
                    alt: "Student's view - full screen preview"
                }
            ],
            license: {
                id: 'MPL2',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['timeline', 'slider'],
            tutorial:
                'https://h5p.org/documentation/content-author-guide/tutorials-for-authors/timeline',
            example: 'https://h5p.org/timeline'
        },
        {
            id: 25,
            machineName: 'H5P.TrueFalse',
            majorVersion: 1,
            minorVersion: 5,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'True/False Question',
            summary: 'Create True/False questions',
            description:
                'True/False Question is a simple and straightforward content type that can work by itself or be inserted into other content types such as Course Presentation. A more complex question can be created by adding an image or a video.',
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.TrueFalse-1.5/icon.svg',
            createdAt: 1488380892,
            updatedAt: 1546596466,
            isRecommended: false,
            popularity: 7,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/true-false-01.png?itok=LKXT7ZAG',
                    alt: "Learner's initial view (image and question)"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/true-false-02.png?itok=5AvPOokc',
                    alt: 'Correct answer given'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/true-false-03.png?itok=YCVfBTig',
                    alt: 'Wrong answer given'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/true-false-04.png?itok=88ogDrvt',
                    alt: "Learner's initial view"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['true', 'false'],
            example: 'https://h5p.org/true-false',
            localMajorVersion: 1,
            localMinorVersion: 5,
            localPatchVersion: 2
        },
        {
            id: 26,
            machineName: 'H5P.TwitterUserFeed',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 16,
            h5pMajorVersion: 1,
            h5pMinorVersion: 0,
            title: 'Twitter User feed',
            summary: 'Show your Twitter feed with H5P',
            description:
                'Add a Twitter user feed to your page. A great way to give your page some social integration and allow more of your users connect with you on Twitter.',
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.TwitterUserFeed-1.0/icon.svg',
            createdAt: 1488381430,
            updatedAt: 1491481318,
            isRecommended: false,
            popularity: 39,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/twitter-user-feed-01.png?itok=FAUcyut3',
                    alt: "User's view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/twitter-user-feed-02.png?itok=JKd0hBOm',
                    alt: "User's view"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Social media'],
            keywords: ['twitter', 'embed'],
            tutorial:
                'https://h5p.org/documentation/content-author-guide/tutorials-for-authors/twitter-user-feed',
            example: 'https://h5p.org/twitter-user-feed',
            localMajorVersion: 1,
            localMinorVersion: 0,
            localPatchVersion: 15
        },
        {
            id: 27,
            machineName: 'H5P.ImageHotspots',
            majorVersion: 1,
            minorVersion: 7,
            patchVersion: 4,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Image Hotspots',
            summary: 'Create an image with multiple info hotspots',
            description:
                'Image hotspots makes it possible to create an image with interactive hotspots. When the user presses a hotspot, a popup containing a header and text or video is displayed. Using the H5P editor, you may add as many hotspots as you like.',
            icon: 'https://h5p.org/sites/default/files/image%20hotpots.svg',
            createdAt: 1491400692,
            updatedAt: 1547046678,
            isRecommended: false,
            popularity: 10,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/image-hotspots-01.png?itok=-GthrRP1',
                    alt: 'View - hotspots'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/image-hotspots-02.png?itok=AP-FWcHh',
                    alt: 'View - video as a hotspot'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/image-hotspots-03.png?itok=Zt1V7UYE',
                    alt: 'View - text as a hotspot'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia'],
            keywords: ['image', 'hotspot'],
            example: 'https://h5p.org/image-hotspots'
        },
        {
            id: 28,
            machineName: 'H5P.ImageMultipleHotspotQuestion',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 0,
            h5pMajorVersion: 1,
            h5pMinorVersion: 6,
            title: 'Find Multiple Hotspots',
            summary: 'Create many hotspots for users to find',
            description:
                'A free HTML5 based question type allowing creatives to create an image based test where the learner is to find the correct spots on an image. Use this content type with the H5P plugin for WordPress, Moodle or Drupal to challenge your users.',
            icon:
                'https://h5p.org/sites/default/files/find%20multiple%20hotspots.svg',
            createdAt: 1491482530,
            updatedAt: 1491485320,
            isRecommended: false,
            popularity: 21,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/multiple-hotspots-01.png?itok=Gbi-unNy',
                    alt: "User's view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/multiple-hotspots-02.png?itok=ctq2RdVL',
                    alt: 'Authoring experience - adding hotspots'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/multiple-hotspots-03.png?itok=uAshALHJ',
                    alt: "User's view"
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'lukemuller',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: [],
            keywords: [],
            example: 'https://h5p.org/find-multiple-hotspots'
        },
        {
            id: 29,
            machineName: 'H5P.ImageJuxtaposition',
            majorVersion: 1,
            minorVersion: 2,
            patchVersion: 2,
            h5pMajorVersion: 1,
            h5pMinorVersion: 15,
            title: 'Image Juxtaposition',
            summary: 'Create interactive images',
            description:
                'A free HTML5-based image content type that allows users to compare two images interactively. Tell your image stories with H5P and Image Juxtaposition on WordPress, Moodle or Drupal.',
            icon:
                'https://h5p.org/sites/default/files/before-after-image_0.svg',
            createdAt: 1491482694,
            updatedAt: 1541164481,
            isRecommended: false,
            popularity: 23,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/image-juxtaposition-01.png?itok=EmBa43Us',
                    alt: "User's view"
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/image-juxtaposition-02.png?itok=idPJFSr2',
                    alt: "User's view"
                }
            ],
            license: {
                id: 'MPL2',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'otacke',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia'],
            keywords: [],
            example: 'https://h5p.org/image-juxtaposition'
        },
        {
            id: 30,
            machineName: 'H5P.Audio',
            majorVersion: 1,
            minorVersion: 3,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Audio',
            summary: 'Upload an audio recording',
            description:
                'Upload an audio recording in .mp3, .wav, .ogg or provide the link for an audio recording.',
            icon: 'https://h5p.org/sites/default/files/audio.svg',
            createdAt: 1491918006,
            updatedAt: 1544697485,
            isRecommended: false,
            popularity: 18,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/audio-01.png?itok=z6wayrwd',
                    alt: 'Audio player'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/audio-02.png?itok=NdFP2pcq',
                    alt: 'Audio player muted'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: true,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia'],
            keywords: [],
            example: 'https://h5p.org/audio',
            localMajorVersion: 1,
            localMinorVersion: 3,
            localPatchVersion: 2
        },
        {
            id: 31,
            machineName: 'H5P.AudioRecorder',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 13,
            h5pMajorVersion: 1,
            h5pMinorVersion: 12,
            title: 'Audio Recorder',
            summary: 'Create an audio recording',
            description:
                'An HTML5 audio recorder. Record your voice and play back or download a .wav file of your recording. Use the H5P plugin to create the H5P Audio Recorder to your Drupal, Wordpress or Moodle site. ',
            icon: 'https://h5p.org/sites/default/files/icon_1.svg',
            createdAt: 1493377972,
            updatedAt: 1493380955,
            isRecommended: true,
            popularity: 33,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/audio-recorder-1.png?itok=vAcuqLSA',
                    alt: 'Start screen for audio recorder'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/audio-recorder-2.png?itok=qoLWgAaq',
                    alt: 'Recording screen for audio recorder'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/audio-recorder-3.png?itok=EnH5rwO4',
                    alt: 'Finish screen for audio recorder'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia'],
            keywords: ['audio', 'recorder'],
            example: 'https://h5p.org/audio-recorder'
        },
        {
            id: 32,
            machineName: 'H5P.SpeakTheWords',
            majorVersion: 1,
            minorVersion: 3,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 14,
            title: 'Speak the Words',
            summary: 'Answer a question using your voice (Chrome only)',
            description:
                'Speak the Words is only supported in browsers that implements the Web Speech API (Chrome browsers, except on iOS). You need a microphone to answer the question. Ask a question to users and make them answer using their voice. You can choose multiple correct answers. The user will be able to see what his words were interpreted as, and how close it was to the correct answers.',
            icon:
                'https://h5p.org/sites/default/files/speak%20the%20words_0.svg',
            createdAt: 1493897505,
            updatedAt: 1506502822,
            isRecommended: false,
            popularity: 34,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/QuestionPagev2.png?itok=WYSV9ON0',
                    alt: 'Question text and answer with microphone screen'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/ShowSolutionPagev2_0.png?itok=vUTAG0RT',
                    alt: 'Interpreted and correct answers screen'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/CorrectSolutionPage.png?itok=poT-tQ6Z',
                    alt: 'Correct answer screen'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'thomasmars',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Questions'],
            keywords: [
                'language',
                'translation',
                'voice',
                'recognition',
                'speech',
                'mic',
                'microphone'
            ],
            example: 'https://h5p.org/node/72682'
        },
        {
            id: 33,
            machineName: 'H5P.Agamotto',
            majorVersion: 1,
            minorVersion: 4,
            patchVersion: 2,
            h5pMajorVersion: 1,
            h5pMinorVersion: 19,
            title: 'Agamotto (Image Blender)',
            summary: 'Present a sequence of images and explanations',
            description:
                'Present a sequence of images that people are supposed to look at one after the other, e.g. photos of an item that changes over time, schematics or maps that are organized in different layers or images that reveal more and more details.',
            icon: 'https://h5p.org/sites/default/files/icon_2.svg',
            createdAt: 1494963576,
            updatedAt: 1541164481,
            isRecommended: false,
            popularity: 31,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/agamotto-02.png?itok=xlA7OqvC',
                    alt: 'Agamotto shown as a layered map'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/agamotto-01.png?itok=nxg6d8eA',
                    alt: 'Agamotto transforming between different seasons'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'otacke',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia'],
            keywords: ['image', 'images', 'transition'],
            example: 'https://h5p.org/node/79243'
        },
        {
            id: 34,
            machineName: 'H5P.ImageSequencing',
            majorVersion: 1,
            minorVersion: 1,
            patchVersion: 0,
            h5pMajorVersion: 1,
            h5pMinorVersion: 12,
            title: 'Image Sequencing',
            summary: 'Place images in the correct order',
            description:
                'A free HTML5 based image sequencing content type that allows authors to add a sequence of their own images (and optional image description) to the game in a particular order. The order of the images will be randomized and players will have to reorder them based on the task description. ',
            icon: 'https://h5p.org/sites/default/files/icon_3.svg',
            createdAt: 1503485910,
            updatedAt: 1511346985,
            isRecommended: false,
            popularity: 24,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/Selection_386.png?itok=HzsvJWBU',
                    alt: 'Initial screen'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/Selection_387.png?itok=m28lDPwX',
                    alt: 'Drag and drop images'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/Selection_388.png?itok=IGV1PN-F',
                    alt: 'Result screen when one or more is incorrect'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/Selection_389.png?itok=VZQIfLEN',
                    alt: 'Result screen when all image are correctly ordered'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'jithin',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['image', 'sequence', 'order'],
            example: 'https://h5p.org/content-types/image-sequencing'
        },
        {
            id: 35,
            machineName: 'H5P.Flashcards',
            majorVersion: 1,
            minorVersion: 5,
            patchVersion: 9,
            h5pMajorVersion: 1,
            h5pMinorVersion: 4,
            title: 'Flashcards',
            summary: 'Create stylish and modern flashcards',
            description:
                'This content type allows authors to create a single flash card or a set of flashcards, where each card has images paired with questions and answers. Learners are required to fill in the text field and then check the correctness of their solution.',
            icon: 'https://h5p.org/sites/default/files/icon_4.svg',
            createdAt: 1503910719,
            updatedAt: 1547046678,
            isRecommended: false,
            popularity: 17,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/flashcards-01_0.png?itok=5xeC6hkY',
                    alt: 'Learner has not given any answer yet'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/flashcards-02_0.png?itok=DQTjS65M',
                    alt: 'Correct answer given'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/flashcards-03_0.png?itok=833omhR4',
                    alt: 'Wrong answer given'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/flashcards-04.png?itok=6S_kGNS4',
                    alt: 'Summary'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Games', 'Multimedia', 'Questions'],
            keywords: ['cards', 'animation'],
            tutorial: 'https://h5p.org/tutorial-flashcards',
            example: 'https://h5p.org/flashcards'
        },
        {
            id: 36,
            machineName: 'H5P.SpeakTheWordsSet',
            majorVersion: 1,
            minorVersion: 1,
            patchVersion: 3,
            h5pMajorVersion: 1,
            h5pMinorVersion: 14,
            title: 'Speak the Words Set',
            summary:
                'Create a series of questions answered by speech (Chrome only)',
            description:
                'Speak the Words Set is only supported in browsers that implement the Web Speech API (Chrome browsers, except on ios). You need a microphone to answer the question. Create a set of questions that learners can answer using their voice. you can choose multiple correct answers. The user will be able to see what his words were interpreted as, and how close it was to the correct answers.',
            icon:
                'https://h5p.org/sites/default/files/speak%20the%20words%20set.svg',
            createdAt: 1506503229,
            updatedAt: 1506504400,
            isRecommended: false,
            popularity: 32,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-01.png?itok=92yvDMEt',
                    alt: 'An image showing the start screen'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-02.png?itok=SSpDaEf6',
                    alt: 'An image showing the question screen'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-03.png?itok=QRR1KWn3',
                    alt: 'An image showing the recording taking place'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-04.png?itok=3vjLOvF3',
                    alt: 'An image showing a correct answer is given'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-05.png?itok=74miXXWG',
                    alt: 'An image showing the solution view'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-06.png?itok=UBAPLNJI',
                    alt: 'An image showing the finish screen'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'Joubel',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: [
                'language',
                'translation',
                'voice',
                'quiz',
                'set',
                'recognition',
                'mic',
                'microphone'
            ],
            example: 'https://h5p.org/speak-the-words-set'
        },
        {
            id: 37,
            machineName: 'H5P.ImageSlider',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 5,
            h5pMajorVersion: 1,
            h5pMinorVersion: 14,
            title: 'Image Slider',
            summary: 'Easily create an Image Slider',
            description:
                'Present your images in an appealing way with ease. Authors just have to upload images and provide alternative texts for the images. \r\n\r\nThe next two images are always preloaded so switching between images will usually be snappy with no delay for loading the next image.\r\n\r\nImages may be experienced as part of the page or in full-screen mode. When used as part of the page the system will pick a fixed aspect ratio depending on the images being used. Authors may decide to handle aspect ratios differently.',
            icon: 'https://h5p.org/sites/default/files/icon_5.svg',
            createdAt: 1508146690,
            updatedAt: 1508158636,
            isRecommended: false,
            popularity: 22,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-01_0.png?itok=PRJNeyt3',
                    alt: 'Preview using full width'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-02_0.png?itok=NXMcjo0p',
                    alt: 'Preview with a portrait image'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/screenshot-03_0.png?itok=jqQysnpP',
                    alt: 'Full-screen preview'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'falcon',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia'],
            keywords: ['image', 'images', 'slider', 'carousel'],
            example: 'https://h5p.org/image-slider'
        },
        {
            id: 38,
            machineName: 'H5P.Essay',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 1,
            h5pMajorVersion: 1,
            h5pMinorVersion: 13,
            title: 'Essay',
            summary: 'Create Essay with instant feedback',
            description:
                "In this content type, the author defines a set of keywords that represent crucial aspects of a topic. These keywords are matched against a text that students have composed and can be used to immediately provide feedback - either suggesting to revise certain topic details if a keyword is missing or, confirming the student's ideas if the text contains a keyword.\r\n",
            icon: 'https://h5p.org/sites/default/files/icon_6.svg',
            createdAt: 1515752007,
            updatedAt: 1515754312,
            isRecommended: false,
            popularity: 28,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/essay-01.png?itok=PJmHwrPp',
                    alt: 'Initial view'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/essay-02.png?itok=b8u7DK0a',
                    alt: 'Showing sample (show solution clicked)'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/essay-03.png?itok=m8BrMhVW',
                    alt: 'Feedback given'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'otacke',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: [],
            keywords: ['Essay'],
            example: 'https://h5p.org/content-types/essay'
        },
        {
            id: 39,
            machineName: 'H5P.ImagePair',
            majorVersion: 1,
            minorVersion: 4,
            patchVersion: 0,
            h5pMajorVersion: 1,
            h5pMinorVersion: 14,
            title: 'Image Pairing',
            summary: 'Drag and drop image matching game',
            description:
                'Image pairing is a simple and effective activity that require learners to match pairs of images. Since it is not required for both images in a pair to be the same, authors are also able to test the understanding of a relation between two different images. ',
            icon: 'https://h5p.org/sites/default/files/icon_7.svg',
            createdAt: 1525354557,
            updatedAt: 1525437284,
            isRecommended: false,
            popularity: 35,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/image-pairing-01.png?itok=6CRqBI7P',
                    alt: 'Initial screen'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/image-pairing-02.png?itok=ZgStVtVj',
                    alt: 'After check - with errors'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/image-pairing-03.png?itok=yIpQuIMP',
                    alt: 'In action'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'jithin',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: [],
            keywords: ['image images matching pair'],
            example: 'https://h5p.org/image-pairing'
        },
        {
            id: 40,
            machineName: 'H5P.Dictation',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 1,
            h5pMajorVersion: 1,
            h5pMinorVersion: 13,
            title: 'Dictation',
            summary: 'Create a dictation with instant feedback',
            description:
                "You can add audio samples containing a sentence for dictation and enter the correct transcription. Your students can listen to the samples and enter what they have heard in to a text field. Their answers will be evaluated automatically. Several options will allow you to control the exercise's difficulty. You can optionally add a second audio sample for a sentence that could hold a version spoken slowly. You can also set a limit for how often a sample can be played, define if punctuation should be relevant for scoring, and decide whether small mistakes like typing errors should be counted as no mistake, a full mistake, or just a half mistake.",
            icon: 'https://h5p.org/sites/default/files/icon_8.svg',
            createdAt: 1544698878,
            updatedAt: 1544702034,
            isRecommended: false,
            popularity: 49,
            screenshots: [
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/dictation-1_0.png?itok=Wu85TuX8',
                    alt: 'Initial view'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/dictation-2_0.png?itok=Mg0TRDj5',
                    alt: 'Show score'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/dictation-3_0.png?itok=eKpbR2t2',
                    alt: 'Showing solution'
                },
                {
                    url:
                        'https://h5p.org/sites/default/files/styles/h5p-content-type-hub-screenshot/public/dictation-berries_0.png?itok=m9KR17o8',
                    alt: 'A dictation about berries'
                }
            ],
            license: {
                id: 'MIT',
                attributes: {
                    useCommercially: true,
                    modifiable: true,
                    distributable: true,
                    sublicensable: true,
                    canHoldLiable: false,
                    mustIncludeCopyright: true,
                    mustIncludeLicense: true
                }
            },
            owner: 'otacke',
            installed: false,
            isUpToDate: false,
            restricted: false,
            canInstall: true,
            categories: ['Multimedia', 'Questions'],
            keywords: ['language', 'audio'],
            example: 'https://h5p.org/dictation'
        },
        {
            id: 5,
            machineName: 'H5P.AppearIn',
            title: 'appear.in for Chat and Talk',
            description: '',
            majorVersion: 1,
            minorVersion: 0,
            patchVersion: 12,
            localMajorVersion: 1,
            localMinorVersion: 0,
            localPatchVersion: 12,
            canInstall: false,
            installed: true,
            isUpToDate: true,
            owner: '',
            restricted: false,
            icon:
                'http://lumi.education/wp-content/uploads/h5p/libraries/H5P.AppearIn-1.0/icon.svg'
        }
    ],
    recentlyUsed: [],
    apiVersion: { major: 1, minor: 19 },
    details: null
};

export default content_type_cache;