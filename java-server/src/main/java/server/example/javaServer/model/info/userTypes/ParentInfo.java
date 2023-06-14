package server.example.javaServer.model.info.userTypes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParentInfo extends UserInfo {
    @Field("related_patients")
    private List<String> relatedPatientIds;
}
