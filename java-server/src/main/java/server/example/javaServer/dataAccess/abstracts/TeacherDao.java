package server.example.javaServer.dataAccess.abstracts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import server.example.javaServer.model.userTypes.Teacher;

@Repository
public interface TeacherDao extends MongoRepository<Teacher, String> {
    Teacher getTeacherById(String teacherId);
}
