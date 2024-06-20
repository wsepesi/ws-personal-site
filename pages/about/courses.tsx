import SiteBase from "@/components/SiteBase"

type Textbook = {
    title: string,
    author: string,
}
type Course = {
    title: string,
    number: string,
    prof: string,
    textbooks: Textbook[]
}

const coursesCS: Course[] = [
    {
        title: "ADVANCED MACHINE LEARNING",
        number: "CSE 517A",
        prof: "Marion Neumann",
        textbooks: [
            {
                title: "A First Course in Machine Learning",
                author: "Simon Rogers and Mark Girolami"
            }
        ]
    },
    {
        title: "CODING AND INFORMATION THEORY",
        number: "CSE 533T",
        prof: "Netanel Raviv",
        textbooks: [
            {
                title: "Elements of Information Theory",
                author: "Thomas M. Cover and Joy A. Thomas"
            },
            {
                title: "Introduction to Coding Theory",
                author: "Ron Roth"
            }
        ]
    },
    {
        title: "DEEP REINFORCEMENT LEARNING",
        number: "CSE 510A",
        prof: "Chongjie Zhang",
        textbooks: [
            {
                title: "Reinforcement Learning: An Introduction",
                author: "Richard S. Sutton and Andrew G. Barto"
            }
        ]
    },
    {
        title: "THEORY OF MACHINE LEARNING",
        number: "CSE 417T",
        prof: "Netanel Raviv",
        textbooks: [
            {
                title: "Understanding Machine Learning",
                author: "Shai Shalev-Shwartz and Shai Ben-David"
            },
            {
                title: "Learning From Data",
                author: "Yaser S. Abu-Mostafa, Malik Magdon-Ismail, and Hsuan-Tien Lin"
            }
        ]
    },
    {
        title: "ARTIFICIAL INTELLIGENCE",
        number: "CSE 412A",
        prof: "William Yeoh",
        textbooks: [
            {
                title: "Artificial Intelligence: A Modern Approach",
                author: "Stuart Russell and Peter Norvig"
            }
        ]
    },
    {
        title: "QUANTUM COMPUTING",
        number: "CSE 468T",
        prof: "Ron Cytron",
        textbooks: [
            {
                title: "An Introduction to Quantum Computing",
                author: "Phillip Kaye, Raymond Laflamme, and Michele Mosca"
            }
        ]
    },
    {
        title: "ALGORITHMS",
        number: "CSE 347",
        prof: "Jeremy Buhler",
        textbooks: [
            {
                title: "Algorithm Design",
                author: "Jon Kleinberg and Éva Tardos"
            }
        ]
    }
]

const coursesMath: Course[] = [
    {
        title: "REAL ANALYSIS",
        prof: "Ari Stern",
        number: "MATH 4111",
        textbooks: [
            {
                title: "Principles of Mathematical Analysis",
                author: "Walter Rudin"
            }
        ]
    },
    {
        title: "MEASURE THEORY AND LEBESGUE INTEGRATION",
        prof: "Quo-Shin Chi",
        number: "MATH 4121",
        textbooks: []
    },
    {
        title: "LINEAR ALGEBRA",
        prof: "John Shareshian",
        number: "MATH 429",
        textbooks: [
            {title: "Linear Algebra",
            author: "Kenneth M. Hoffman and Ray Kunze"}
        ]
    },
    {
        title: "PROBABILITY THEORY",
        prof: "Debashis Mondal",
        number: "MATH 493",
        textbooks: [
            {
                title: "A First Course in Probability",
                author: "Sheldon Ross"
            }
        ]
    },
    {
        title: "TOPOLOGY",
        prof: "Wanli Song",
        number: "MATH 4171",
        textbooks: [
            {
                title: "A Course in Point Set Topology",
                author: "John B. Conway"
            }
        ]
    },
    {
        title: "NUMERICAL APPLIED MATHEMATICS",
        prof: "Donsub Rim",
        number: "MATH 449",
        textbooks: [
            {
                title: "An Introduction to Numerical Analysis",
                author: "Endre Süli and David F. Mayers"
            }
        ]
    },
    {
        title: "ABSTRACT ALGEBRA",
        prof: "Jesús Sanchez Jr.",
        number: "MATH 430",
        textbooks: [
            {
                title: "Contemporary Abstract Algebra",
                author: "Joseph A. Gallian"
            }
        ]
    },
    {
        title: "HONORS MATHEMATICS",
        prof: "Ari Stern",
        number: "MATH 203/204",
        textbooks: [
            {
                author: "Tom M. Apostol",
                title: "Calculus"
            }
        ]
    }
]

const coursesOther: Omit<Course, 'textbooks'>[] = [
    {
        title: "CONTEMPORARY ART HISTORY",
        prof: "Ila Sheren",
        number: "AA 3973"
    },
    {
        title: "PARIS, A DIGITAL 19TH CENTURY",
        prof: "Seth Graebner",
        number: "FREN 3701"
    },
    {
        title: "PHYSICAL SCIENCE IN 12 PROBLEMS",
        prof: "Lee Sobotka",
        number: "PHYS 400"
    }
]

const Courses = () => { // TODO: rework for mobile
    return (
        <SiteBase title="Coursework" description="william sepesi's personal website coursework page">
            <div className="flex flex-row">
                <p className="w-auto mb-3">
                    I graduated in spring 2024 with a double major in computer science and mathematics after spending 3.5 years at WU and my junior spring semester at the Sorbonne in Paris.
                </p>
                <div className="">
                    {/* <RetroPhoto src={me} alt={"paris, france. feb 2023"} small={true}/>  */}
                </div>
            </div>
            <hr className="my-2 bg-black h-[2px]"/>
            <p className="italic pt-2">Select coursework from Washington University</p>
            <p className="text-xl pb-1 underline">Computer Science</p>
            <div>
                {coursesCS.map((course: Course) => {
                    return (
                        <div key={course.number}>
                            <div className="flex flex-col sm:flex-row sm:items-end"><p className="text-lg">{course.title} ({course.number}),&nbsp;</p><p className="italic sm:not-italic">{course.prof}</p></div>
                            <ul className="list-disc list-inside pl-2">
                                {course.textbooks.map((textbook: Textbook) => {
                                    return (
                                        <li key={textbook.title}>{textbook.title}, {textbook.author}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
            <p className="text-xl py-1 underline">Mathematics</p>
            <div>
                {coursesMath.map((course: Course) => {
                    return (
                        <div key={course.number}>
                            <div className="flex flex-col sm:flex-row sm:items-end"><p className="text-lg">{course.title} ({course.number}),&nbsp;</p><p className="italic sm:not-italic">{course.prof}</p></div>
                            <ul className="list-disc list-inside pl-2">
                                {course.textbooks.map((textbook: Textbook) => {
                                    return (
                                        <li key={textbook.title}>{textbook.title}, {textbook.author}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
            <p className="text-xl py-1 underline">Other</p>
            <div>
                {coursesOther.map((course: Omit<Course, 'textbooks'>) => {
                    return (
                        <div key={course.number}>
                            <p>{course.title} ({course.number}), {course.prof}</p>
                        </div>
                    )
                })}
            </div>
        </SiteBase>
    )
}

export default Courses