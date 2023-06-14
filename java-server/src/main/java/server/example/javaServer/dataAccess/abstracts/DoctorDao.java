package server.example.javaServer.dataAccess.abstracts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import server.example.javaServer.model.userTypes.Doctor;

@Repository
public interface DoctorDao extends MongoRepository<Doctor, String> {
    Doctor getDoctorById(String userId);
}
