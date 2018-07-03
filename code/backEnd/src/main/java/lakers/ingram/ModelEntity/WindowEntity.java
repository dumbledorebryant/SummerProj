package lakers.ingram.ModelEntity;

import javax.persistence.*;

@Entity
@Table(name = "window", schema = "summerproj", catalog = "")
public class WindowEntity {
    private int windowId;
    private String restaurant;
    private String windowName;
    private int floor;

    @Id
    @Column(name = "window_id", nullable = false)
    public int getWindowId() {
        return windowId;
    }

    public void setWindowId(int windowId) {
        this.windowId = windowId;
    }

    @Basic
    @Column(name = "restaurant", nullable = false, length = 45)
    public String getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(String restaurant) {
        this.restaurant = restaurant;
    }

    @Basic
    @Column(name = "windowName", nullable = false, length = 45)
    public String getWindowName() {
        return windowName;
    }

    public void setWindowName(String windowName) {
        this.windowName = windowName;
    }

    @Basic
    @Column(name = "floor", nullable = false)
    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WindowEntity that = (WindowEntity) o;

        if (windowId != that.windowId) return false;
        if (floor != that.floor) return false;
        if (restaurant != null ? !restaurant.equals(that.restaurant) : that.restaurant != null) return false;
        if (windowName != null ? !windowName.equals(that.windowName) : that.windowName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = windowId;
        result = 31 * result + (restaurant != null ? restaurant.hashCode() : 0);
        result = 31 * result + (windowName != null ? windowName.hashCode() : 0);
        result = 31 * result + floor;
        return result;
    }
}
