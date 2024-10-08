import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Table } from '@gui-one/antd-formily-boost';
import { Form, FormItem, Input, Select, Space } from '@formily/antd';
import { Button } from 'antd';
import { useMemo } from 'react';
import { observable } from '@formily/reactive';
import React from 'react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Table,
    },
});

let lastState = observable({
    data: [
        {
            name: 'fish',
            age: 123,
        },
        {
            name: 'cat',
            age: 456,
        },
        {
            name: 'dog',
            age: 789,
        },
    ],
});

const onClick = () => {
    lastState.data[1]._radio = !lastState.data[1]._radio;
};

export default () => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
            effects: () => {},
        });
    }, []);
    return (
        <Space direction="vertical" size={10} style={{ display: 'flex' }}>
            <Form form={form} feedbackLayout="terse">
                <SchemaField>
                    <SchemaField.Array name="data" x-component="Table">
                        <SchemaField.Void>
                            <SchemaField.Void
                                x-component="Table.RadioColumn"
                                x-component-props={{
                                    //点击状态记录在data本身
                                    selectedIndex: '_radio',
                                    //点击行来实现选择
                                    selectRowByClick: true,
                                }}
                            />
                            <SchemaField.Void
                                title="名字"
                                x-component="Table.Column"
                                x-component-props={{}}
                            >
                                <SchemaField.String
                                    name="name"
                                    x-component={'Input'}
                                    x-component-props={{
                                        readOnly: true,
                                        bordered: false,
                                    }}
                                />
                            </SchemaField.Void>

                            <SchemaField.Void
                                title="年龄"
                                x-component="Table.Column"
                                x-component-props={{}}
                            >
                                <SchemaField.String
                                    name="age"
                                    x-component={'Input'}
                                    x-component-props={{
                                        readOnly: true,
                                        bordered: false,
                                    }}
                                />
                            </SchemaField.Void>
                        </SchemaField.Void>
                    </SchemaField.Array>
                </SchemaField>

                <FormConsumer>
                    {() => <div>{JSON.stringify(form.values)}</div>}
                </FormConsumer>
            </Form>
            <Space direction={'horizontal'}>
                <Button onClick={onClick} type="primary">
                    Toggle第二行的选中状态
                </Button>
            </Space>
        </Space>
    );
};
