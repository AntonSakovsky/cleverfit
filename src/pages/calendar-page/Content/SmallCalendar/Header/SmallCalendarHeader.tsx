import { Col, Radio, Row, Select } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { Moment } from "moment";
import { FC } from "react";

type SmallCalendarHeaderProps = {
    value: Moment,
    type: CalendarMode,
    onChange: (date: Moment) => void,
    onTypeChange: (type: CalendarMode) => void
}

export const SmallCalendarHeader: FC<SmallCalendarHeaderProps> = ({ value, type, onChange, onTypeChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    let current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
        current = current.month(i);
        months.push(localeData.monthsShort(current));
    }

    for (let i = start; i < end; i++) {
        monthOptions.push(
            <Select.Option key={i} value={i} className="month-item">
                {months[i]}
            </Select.Option>,
        );
    }

    const year = value.year();
    const month = value.month();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
        options.push(
            <Select.Option key={i} value={i} className="year-item">
                {i}
            </Select.Option>,
        );
    }
    return (
        <div style={{ padding: 8 }}>
            <Row gutter={5} justify={"end"}>
                <Col>
                    <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        value={year}
                        onChange={(newYear) => {
                            const now = value.clone().year(newYear);
                            onChange(now);
                        }}
                    >
                        {options}
                    </Select>
                </Col>

                <Col>
                    <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={month}
                        onChange={(newMonth) => {
                            const now = value.clone().month(newMonth);
                            onChange(now);
                        }}
                    >
                        {monthOptions}
                    </Select>
                </Col>
                <Col>
                    <Radio.Group
                        size="small"
                        onChange={(e) => onTypeChange(e.target.value)}
                        value={type}
                    >
                        <Radio.Button value="month">Месяц</Radio.Button>
                        <Radio.Button value="year">Год</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </div>
    );
}