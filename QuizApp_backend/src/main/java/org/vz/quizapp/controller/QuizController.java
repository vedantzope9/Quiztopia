package org.vz.quizapp.controller;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vz.quizapp.exception.QuestionException;
import org.vz.quizapp.model.*;
import org.vz.quizapp.service.QuizService;

import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/")
    public String greet(){
        return "Welcome to Quiz Portal";
    }

    //localhost:8080/quiz/create?category=SpringBoot&numQ=5&title=SpringBootQuiz

    @GetMapping("/create")
    public ResponseEntity<String> createQuiz(@RequestParam String category , @RequestParam int numQ, @RequestParam String title){
        return quizService.createQuiz(category,numQ,title);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Quiz>> getAllQuizes(){
        return quizService.getAllQuizes();
    }

    @GetMapping("/get/{quizId}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable int quizId) throws QuestionException {
        return quizService.getQuizQustions(quizId);
    }

    //to check the answer given by the user of the quiz
    @PostMapping("/submit/{quizId}")
    public ResponseEntity<Integer> checkScore(@PathVariable Integer quizId , @RequestBody List<Response> responses) throws QuestionException {
        System.out.println("I m here");
        return quizService.checkScore(quizId , responses);
    }

    @PostMapping("/check_ans/{quizId}")
    public ResponseEntity<List<Answers>> checkAnswers(@PathVariable Integer quizId , @RequestBody List<Response> responses){
        return quizService.checkAnswers(quizId , responses);
    }
}
