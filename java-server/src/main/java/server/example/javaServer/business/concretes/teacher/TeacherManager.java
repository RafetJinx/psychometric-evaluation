package server.example.javaServer.business.concretes.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.teacher.TeacherService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.TeacherDao;
import server.example.javaServer.model.AssignedTestToTeacher;

import java.util.List;

@Service
public class TeacherManager implements TeacherService {
    private TeacherDao teacherDao;

    @Autowired
    public TeacherManager(TeacherDao teacherDao) {
        this.teacherDao = teacherDao;
    }

    @Override
    public DataResult<List<String>> getRelatedPatientIdsByTeacherId(String teacherId) {
        List<String> relatedPatientIds = teacherDao.getTeacherById(teacherId).getRelatedPatientIds();


        if(relatedPatientIds == null) {
            return new ErrorDataResult<List<String>>("Assigned tests are null.", null);
        }
        else if(relatedPatientIds.isEmpty()) {
            return new ErrorDataResult<List<String>>("No related patient id was found", relatedPatientIds);
        }
        else {
            return new SuccessDataResult<List<String >>("All related patient ids were brought.", relatedPatientIds);
        }
    }

    @Override
    public DataResult<List<AssignedTestToTeacher>> getAssignedTestsByTeacherId(String teacherId) {
        List<AssignedTestToTeacher> assignedTestToTeacher = teacherDao.getTeacherById(teacherId).getAssignedTests();


        if(assignedTestToTeacher == null) {
            return new ErrorDataResult<List<AssignedTestToTeacher>>("Assigned tests are null.", null);
        }
        else if(assignedTestToTeacher.isEmpty()){
            return new ErrorDataResult<List<AssignedTestToTeacher>>("No related assigned test to teacher was found", assignedTestToTeacher);
        }
        else {
            return new SuccessDataResult<List<AssignedTestToTeacher>>
                    ("All assigned test to teacher were brought.", assignedTestToTeacher);
        }
    }
}
