package org.vz.quizapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.vz.quizapp.model.Quiz;

public interface QuizRepo extends JpaRepository<Quiz,Integer> {

}
