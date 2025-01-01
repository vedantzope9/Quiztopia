package org.vz.quizapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vz.quizapp.exception.QuestionException;
import org.vz.quizapp.model.Questions;
import org.vz.quizapp.service.QuestionsService;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionsService service;

    @GetMapping("/allQuestions")
    public ResponseEntity<List<Questions>> getAllQuestions(){
        List<Questions> list= service.getAllQuestions();
        return new ResponseEntity<>(list , HttpStatus.OK);
    }

    @GetMapping("/category/{category_name}")
    public ResponseEntity<List<Questions>> fetchByCategory(@PathVariable String category_name){
        List<Questions> list= service.fetchByCategory(category_name);
        return new ResponseEntity<>(list , HttpStatus.OK);
    }

    @PostMapping("/addQuestions")
    public ResponseEntity<?> addQuestions(@RequestBody Questions questions){
        service.addQuestions(questions);
        return new ResponseEntity<>("Question Added!" , HttpStatus.CREATED);
    }

    @GetMapping("/allQuestions/{id}")
    public ResponseEntity<Questions> getQuestionById(@PathVariable int id) throws QuestionException {
        Questions questions=service.getQuestionById(id);
        return new ResponseEntity<>(questions , HttpStatus.OK);
    }

    @DeleteMapping("/allQuestions/{id}")
    public ResponseEntity<String> deleteQuestionById(@PathVariable int id) throws QuestionException{
        service.deleteQuestionById(id);
        return new ResponseEntity<>("Question Deleted!" , HttpStatus.OK);
    }

    @PostMapping("/allQuestions/{id}")
    public ResponseEntity<String> updateQuestion(@RequestBody Questions questions)throws QuestionException{
        service.updateQuestion(questions);
        return new ResponseEntity<>("Question Updated!" , HttpStatus.OK);
    }
}
