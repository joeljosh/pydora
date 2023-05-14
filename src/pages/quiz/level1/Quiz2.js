import "./Level1.css"
import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

import PyLogo from "../../../assets/images/pylogo.png"

import Pharoah from "../../../assets/images/level1/pharoah.png"

import Congrats from "../../../assets/images/prize/congrats.png"
import Fail from "../../../assets/images/prize/tryagain.png"

import { FaArrowLeft } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { BsFillPlayFill } from "react-icons/bs";

import { Link } from "react-router-dom";

// import Snackbar
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Quiz2 = () => {

    const [alertinfo, setAlertinfo] = useState({
        open: false,
        msg: "Correct answer",
        severity: "success"
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertinfo({ ...alertinfo, open: false });
    };

    const navigate = useNavigate();
    const [currQuestion, setCurrQuestion] = useState(1)
    const [xp, setXp] = useState(0)

    // total questions in sublevel(17 questions and 1 result section)
    const total_ques = 17
    //  and total xp
    const total_xp = 230

    // result to dash
    const closeQuiz = () => {
        navigate('/learn')
    }

    // MCQ parts
    const [mcq, setMcq] = useState([0, 0])
    const selectOption = (opt, ans, arr) => {
        setMcq(arr);

        // calculate score for each problem
        let score = 10

        if (opt === ans) {
            console.log("Correct");
            updateXp(xp + score);
            setAlertinfo({
                open: true,
                msg: "Correct answer",
                severity: "success"
            })
        }
        else {
            console.log("Incorrect");
            updateXp(xp + 0);
            setAlertinfo({
                open: true,
                msg: "Incorrect answer",
                severity: "error"
            })
        }
        setTimeout(nextQuestion, 1600);


    }

    const [inputvalue, setInputvalue] = useState(["", "", "", "", "", "", ""])
    // const [answer, setAnswer] = useState(["", "", "", "", "", "", ""])
    let answer = ["", "", "", "", "", "", ""]

    const updateInputValue = (val, i) => {
        const newInputValues = [...inputvalue];
        newInputValues[i] = val;
        setInputvalue(newInputValues)
    }

    const updateXp = (val) => {
        setXp(val)
        console.log("Current XP: ", xp)
    }

    const checkAnswer = (ans) => {
        let check = true
        answer = ans
        console.log(inputvalue)
        console.log(answer)

        // calculate score for each problem
        let score = 0
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] !== "") {
                score += 10
            }
            else {
                break
            }
        }
        console.log(score)

        // checking if the answer is right
        for (let i = 0; i < inputvalue.length; i++) {
            if (inputvalue[i] !== answer[i]) {
                check = false
                break
            }
        }
        if (check) {
            console.log("Correct");
            updateXp(xp + score);
            setAlertinfo({
                open: true,
                msg: "Correct answer",
                severity: "success"
            })
        }
        else {
            console.log("Incorrect");
            updateXp(xp + 0);
            setAlertinfo({
                open: true,
                msg: "Incorrect answer",
                severity: "error"
            })
        }
        setTimeout(nextQuestion, 1600);
    }

    const nextQuestion = () => {
        setCurrQuestion(currQuestion + 1)
        setInputvalue(["", "", "", "", "", "", ""])
        setMcq([0, 0])
        console.log("Current xp: ", xp)
    }

    // useEffect(() => {
    //     console.log("Answer updated to: ", answer)
    // }, [answer]);

    return (
        <div className="quiz_page">
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                style={{width: "500px"}}
                open={alertinfo.open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertinfo.severity} sx={{ width: '100%', fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 600, borderRadius: "10px"}}>
                    {alertinfo.msg}
                </Alert>
            </Snackbar>
            <div className="quiz_header">
                <div className="quiz_header_left">
                    <Link to="/learn">
                        <i><FaArrowLeft /></i>
                        <span>Pydora</span>
                    </Link>
                </div>
                <div className="quiz_header_progress">
                    <div className="quiz_header_progress_completed"
                        style={{ width: `${currQuestion * 100 / total_ques}%` }}
                    ></div>
                </div>
                <div className="quiz_header_right">
                    <i><SiBookstack /></i>
                    <span>Using Variables</span>
                </div>

            </div>

            <div className="quiz_section">

                {/* Question 1*/}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                            <p>Variables are called variables because the values they store can change. We can update <span>status</span> by using <span>=</span> and giving it a new value.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p><span>status = “Watching the night sky”</span></p>
                                <p>
                                    <span>status</span>
                                    <input style={{ width: "40px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />
                                    <span>"Relaxing at the beach"</span>
                                </p>
                                <p><span>print(status)</span></p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["=", "", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>


                 {/* Question 2*/}
                 <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                           <p>We can also give variables the values of other variables. Here, we can give the <span>new_status</span> variable the value of <span>default_option</span>.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p><span>default_option = “upload”</span></p>
                                <p><span>new_status = “download”</span></p>
                                <p>
                                    <span>new_status = </span>
                                    <input style={{ width: "150px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />
                                </p>
                                <p><span>print(new_status)</span></p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["default_option", "", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>

                 {/* Question 3*/}
                 <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                            <p>When we update a variable, it forgets its previous value.Here, we van display the <span>status</span> variable twice and see how its value updates.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p><span>status = "Playing Footbal"</span></p>
                                <p>
                                    <span>print(</span>
                                    <input style={{ width: "70px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />
                                    <span>)</span>
                                </p>
                              <p><span>status = "Walking the dog"</span></p>
                              <p><span>print(status)</span></p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["status", "", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>



                 {/* Question 4 */}
                 <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below and two options to choose from */}
                    <div className="quiz_content_ide_mcq">
                        {/* Type each question in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_mcq_question">
                            <p>Which of these lines of code updates the <span>status</span> variable?</p>
                        </div>
                        {/* Add the mcq options here */}
                        <div className="quiz_mcq_options">
                            {/* selectOption(option, answer, array):
                             option is the value in the <span></span>
                             answer is the correct option
                             array would be [1,0] for the first option and [0,1] for the second option */}
                            <p className={mcq[0] === 1 ? "selected" : ""} onClick={() => selectOption(1, 2, [1, 0])}>
                                <span>1</span>
                                status == "Working out"
                            </p>
                            <p className={mcq[1] === 1 ? "selected" : ""} onClick={() => selectOption(2, 2, [0, 1])}>
                                <span>2</span>
                                status = "Working out"
                            </p>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>
               



                 {/* Question 5*/}
                 <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                            <p>Change the value in the <span>temperature</span> variable to <span>"100 degrees"</span>.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p><span>temperature = "0 degree"</span></p>
                                <p>
                                    <input style={{ width: "150px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />
                                    <span>= "100 degrees"</span>
                                </p>
                              <p><span>print(temperature)</span></p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["temperature", "", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>


                {/* Question 6*/}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                             <p>We can add string values together with a <span>+</span> sign.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p>
                                    <span>"Followers:" </span>
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />
                                    <span>"55"</span>
                                </p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["+", "", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>



                {/* Question 7*/}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                             <p>We call adding string values an <b>expression</b>  as it creates a single value. One string displays when we add <span>"55"</span> inside <span>print()</span>.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p>
                                    <span>print("Followers:" </span>
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 1)} />   
                                    <span>)</span>                                
                                </p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["+", "\"55\"", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>

                {/* Question 8*/}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                             <p>When expressions contain variables, they use the values in the variables, which we can see when dding <span>"Followers:"</span> to <span>followers.</span></p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p><span>followers = "55"</span></p>

                                <p>
                                    <span>print("Followers:" </span>
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />
                                    <input style={{ width: "100px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 1)} />   
                                    <span>)</span>                                
                                </p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["+", "followers", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>


                
                {/* Question 9 */}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below and two options to choose from */}
                    <div className="quiz_content_ide_mcq">
                        {/* Type each question in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_mcq_question">
                            <p>What does this code display in the console?</p>
                        </div>

                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line */}
                            <div className="quiz_ide_content">
                                <p> <span>print("Jon" + "athan")</span> </p>
                            </div>
                        </div>

                        {/* Add the mcq options here */}
                        <div className="quiz_mcq_options">
                            {/* selectOption(option, answer, array):
                             option is the value in the <span></span>
                             answer is the correct option
                             array would be [1,0] for the first option and [0,1] for the second option */}
                            <p className={mcq[0] === 1 ? "selected" : ""} onClick={() => selectOption(1, 2, [1, 0])}>
                                <span>1</span>
                                Nothing, because there’s no print() instruction.

                            </p>
                            <p className={mcq[1] === 1 ? "selected" : ""} onClick={() => selectOption(2, 2, [0, 1])}>
                                <span>2</span>
                                Jonathan
                            </p>
                        </div>

                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>


                {/* Question 10*/}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                             <p>We’ll encounter many other kinds of values in Python, too. Like <b>numbers</b>, which have no double quotes  around them.</p>
                             <p> <span>5</span> or <span>"5"</span></p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">


                                <p>
                                    <span>active_user =  </span>
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />                                
                                </p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["5", "", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>

                


                {/* Question 11*/}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                             <p>Numbers make it easier to keep track of <b>numeric data</b> . Like here, <span>active_users</span> stores the number <span>5</span>.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">


                                <p>
                                    <input style={{ width: "150px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />                                
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 1)} />                                
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 2)} />                                

                                </p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["active_users", "=", "5", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>

                

                 {/* Question 12*/}
                 <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                            <p>We can create expression with numbers,too. Here, we can add numbers together with <span>+ 1 </span>.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">


                                <p>
                                    <span>number_of_applications = 5 </span>
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />                                
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 1)} />                                

                                </p>
                                <p><span>print(number_of_applications)</span></p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["+", "1", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>


                {/* Question 13*/}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                            <p>We use the <span>*</span> sign to multiply numbers and the <span>/</span> sign to divide numbers. We'll turn <span>0.5</span> into its percent values 
                            by multiplying it by <span>100</span>.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p>
                                    <span>percent = 0.5</span>
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />                                
                                    <span>100</span>
                                </p>
                                <p><span>print(percent)</span></p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["*", "", "", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>

                



                {/* Question 14 */}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below and two options to choose from */}
                    <div className="quiz_content_ide_mcq">
                        {/* Type each question in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_mcq_question">
                            <p>What's the value of <span>speed</span>?</p>
                        </div>

                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line */}
                            <div className="quiz_ide_content">
                                <p> <span>speed = 300 + 5</span> </p>
                            </div>
                        </div>

                        {/* Add the mcq options here */}
                        <div className="quiz_mcq_options">
                            {/* selectOption(option, answer, array):
                             option is the value in the <span></span>
                             answer is the correct option
                             array would be [1,0] for the first option and [0,1] for the second option */}
                            <p className={mcq[0] === 1 ? "selected" : ""} onClick={() => selectOption(1, 1, [1, 0])}>
                                <span>1</span>
                                305

                            </p>
                            <p className={mcq[1] === 1 ? "selected" : ""} onClick={() => selectOption(2, 1, [0, 1])}>
                                <span>2</span>
                                300
                            </p>
                        </div>

                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>


                


                {/* Question 15 */}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below and two options to choose from */}
                    <div className="quiz_content_ide_mcq">
                        {/* Type each question in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_mcq_question">
                            <p>What does this code display in the console?</p>
                        </div>

                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line */}
                            <div className="quiz_ide_content">
                                <p><span>area = "3 * 5"</span></p>
                                <p><span>print(area)</span></p>
                            </div>
                        </div>

                        {/* Add the mcq options here */}
                        <div className="quiz_mcq_options">
                            {/* selectOption(option, answer, array):
                             option is the value in the <span></span>
                             answer is the correct option
                             array would be [1,0] for the first option and [0,1] for the second option */}
                            <p className={mcq[0] === 1 ? "selected" : ""} onClick={() => selectOption(1, 1, [1, 0])}>
                                <span>1</span>
                                3 * 5

                            </p>
                            <p className={mcq[1] === 1 ? "selected" : ""} onClick={() => selectOption(2, 1, [0, 1])}>
                                <span>2</span>
                                15
                            </p>
                        </div>

                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>



                 {/* Question 16*/}
                 <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_ide">
                        {/* Type each paragraphs in '<p></p>' and contain highlighted texts within '<span></span>' */}
                        <div className="quiz_content_ide_theory">
                             <p>Divide <span>sum_of_grades</span> by <span>students</span> to get average grade of a class.</p>
                        </div>
                        <div className="quiz_ide">
                            <div className="quiz_ide_header">
                                <img src={PyLogo} alt="" />
                                <span>script.py</span>
                            </div>
                            {/* The content inside IDE. Use 'p' tags for newlines and 'span' for texts on the same line along with 'input' */}
                            {/* Adjust the width to suit the size of the answer word */}
                            {/* Inside the updateInputValue function the second value is the index which would be 0 for the first input, 1 for the 2nd and so on */}
                            <div className="quiz_ide_content">

                                <p><span>sum_of_grades = 460</span></p>
                                <p><span>students = 5</span></p>
                                <p>
                                    <span>print(</span>
                                    <input style={{ width: "150px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 0)} />                                
                                    <input style={{ width: "50px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 1)} />                                
                                    <input style={{ width: "100px" }} type="text" onChange={(e) => updateInputValue(e.target.value, 2)} />   
                                    <span>)</span>                             

                                </p>
                            </div>
                            {/* The answer array consists of an array of strings. The one below has only one string since there is only one input*/}
                            <div className="run" onClick={() => checkAnswer(["sum_of_grades", "/", "students", "", "", "", ""])}> <i><BsFillPlayFill /></i> RUN</div>
                        </div>
                    </div>
                    <div className="next_q_btn" onClick={nextQuestion}>
                        <div className="next_q_btn_text">Next</div>
                        <div className="next_q_btn_shadow"></div>
                    </div>
                </div>


                {/* RESULT */}
                <div className="quiz_section_content" style={{ transform: `translateY(-${(currQuestion - 1) * 100}%)` }}>
                    {/* This consists of a paragraph and an IDE below where the input fields should be filled */}
                    <div className="quiz_content_result">
                        <img src={xp < (total_xp / 2) ? Fail : Congrats} alt=""/>
                        <div className="quiz_content_result_title">{xp < (total_xp / 2) ? "Almost there" : "Congratulations"}</div>
                        <p>You have {xp < (total_xp / 2) ? " only " : " "} earned {xp} XP !</p>
                        <div className="result_btn" onClick={closeQuiz}>
                        <div className="result_btn_text">{xp < (total_xp / 2) ? "Try Again" : "Continue"}</div>
                        <div className="result_btn_shadow"></div>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    )
}