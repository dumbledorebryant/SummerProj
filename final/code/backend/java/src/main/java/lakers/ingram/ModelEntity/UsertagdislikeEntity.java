package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "usertagdislike", schema = "canteen", catalog = "")
@IdClass(UsertagdislikeEntityPK.class)
public class UsertagdislikeEntity implements Serializable {
    private int userId;
    private int tagId;
    private Integer dislikeCount;

    public UsertagdislikeEntity(){};
    public UsertagdislikeEntity(int userId,int tagId){
        this.tagId=tagId;
        this.userId=userId;
        this.dislikeCount=1;
    }

    @Id
    @Column(name = "userId", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Id
    @Column(name = "tagId", nullable = false)
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    @Basic
    @Column(name = "dislikeCount", nullable = true)
    public Integer getDislikeCount() {
        return dislikeCount;
    }

    public void setDislikeCount(Integer dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsertagdislikeEntity that = (UsertagdislikeEntity) o;
        return userId == that.userId &&
                tagId == that.tagId &&
                Objects.equals(dislikeCount, that.dislikeCount);
    }

    @Override
    public int hashCode() {

        return Objects.hash(userId, tagId, dislikeCount);
    }
}
