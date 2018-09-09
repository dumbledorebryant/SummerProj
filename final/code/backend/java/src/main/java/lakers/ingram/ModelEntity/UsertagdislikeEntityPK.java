package lakers.ingram.ModelEntity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class UsertagdislikeEntityPK implements Serializable {
    private int userId;
    private int tagId;

    @Column(name = "userId", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "tagId", nullable = false)
    @Id
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsertagdislikeEntityPK that = (UsertagdislikeEntityPK) o;
        return userId == that.userId &&
                tagId == that.tagId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(userId, tagId);
    }
}
