package org.vz.quizapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.vz.quizapp.model.Questions;
import org.vz.quizapp.service.QuestionsService;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionsService service;

    @GetMapping("/")
    public String greet(){
        return "Welcome to Quiz Portal";
    }

    @GetMapping("/allQuestions")
    public List<Questions> getAllQuestions(){
        return service.getAllQuestions();
    }

    @GetMapping("/category/{category_name}")
    public List<Questions> fetchByCategory(@PathVariable String category_name){
        return service.fetchByCategory(category_name);
    }
}
