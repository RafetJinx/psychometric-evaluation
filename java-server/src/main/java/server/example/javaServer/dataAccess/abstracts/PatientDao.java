package server.example.javaServer.dataAccess.abstracts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import server.example.javaServer.model.userTypes.Patient;

import java.util.List;

@Repository
public interface PatientDao extends MongoRepository<Patient, String> {
    /*
    @Query(value = "{ 'id' : ?0 }", fields = "{'assignedTests.testId' : 1, 'assignedTests.solved' :  1}")
    List<Patient> findAssignedTestsByPatientId(String patientId);
    */

    // To get a list of user datas
    List<Patient> getPatientsBy(String patientId);

    // To get a single user data
    Patient getPatientById(String patientId);
}
