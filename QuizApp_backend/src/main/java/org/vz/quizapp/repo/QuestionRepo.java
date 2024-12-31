package org.vz.quizapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.vz.quizapp.model.Questions;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Questions, Integer> {

    List<Questions> findByCategory(String categoryName);
}
