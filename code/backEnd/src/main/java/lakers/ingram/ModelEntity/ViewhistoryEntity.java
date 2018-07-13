package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "viewhistory", schema = "summerproj", catalog = "")
@IdClass(ViewhistoryEntityPK.class)
public class ViewhistoryEntity implements Serializable {
    private int userId;
    private int windowId;
    private Integer count;

    @Id
    @Column(name = "userId", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Id
    @Column(name = "windowId", nullable = false)
    public int getWindowId() {
        return windowId;
    }

    public void setWindowId(int windowId) {
        this.windowId = windowId;
    }

    @Basic
    @Column(name = "count", nullable = true)
    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ViewhistoryEntity that = (ViewhistoryEntity) o;
        return userId == that.userId &&
                windowId == that.windowId &&
                Objects.equals(count, that.count);
    }

    @Override
    public int hashCode() {

        return Objects.hash(userId, windowId, count);
    }
}
