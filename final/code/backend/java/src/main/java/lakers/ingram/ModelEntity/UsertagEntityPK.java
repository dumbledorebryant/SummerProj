package lakers.ingram.ModelEntity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class UsertagEntityPK implements Serializable {
    private int tagId;
    private int userId;

    @Column(name = "tagID", nullable = false)
    @Id
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Column(name = "userID", nullable = false)
    @Id
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
        UsertagEntityPK that = (UsertagEntityPK) o;
        return tagId == that.tagId &&
                userId == that.userId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(tagId, userId);
    }
}
