package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "usertag", schema = "SummerProj", catalog = "")
@IdClass(UsertagEntityPK.class)
public class UsertagEntity {
    private int tagId;
    private int userId;

    @Id
    @Column(name = "tagID")
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Id
    @Column(name = "userID")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsertagEntity that = (UsertagEntity) o;
        return tagId == that.tagId &&
                userId == that.userId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(tagId, userId);
    }
}
