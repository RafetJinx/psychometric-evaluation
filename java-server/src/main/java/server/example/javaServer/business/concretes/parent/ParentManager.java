package server.example.javaServer.business.concretes.parent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.parent.ParentService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.ParentDao;
import server.example.javaServer.model.AssignedTestToParent;

import java.util.List;

@Service
public class ParentManager implements ParentService {
    private ParentDao parentDao;

    @Autowired
    public ParentManager(ParentDao parentDao) {
        this.parentDao = parentDao;
    }


    @Override
    public DataResult<List<String>> getRelatedPatientIdsByParentId(String parentId) {
        List<String> relatedPatientIds = parentDao.getParentById(parentId).getRelatedPatientIds();

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
    public DataResult<List<AssignedTestToParent>> getAssignedTestsByParentId(String parentId) {
        List<AssignedTestToParent> assignedTestToParent = parentDao.getParentById(parentId).getAssignedTests();


        if(assignedTestToParent == null) {
            return new ErrorDataResult<List<String>>("Assigned tests are null.", null);
        }
        else if(assignedTestToParent.isEmpty()){
            return new ErrorDataResult<List<AssignedTestToParent>>("No related assigned test to parent was found", assignedTestToParent);
        }
        else {
            return new SuccessDataResult<List<AssignedTestToParent>>
                    ("All assigned test to parent were brought.", assignedTestToParent);
        }
    }
}
