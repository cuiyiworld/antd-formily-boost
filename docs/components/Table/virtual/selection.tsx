import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Table } from '@gui-one/antd-formily-boost';
import { Form, FormItem, Input, Select } from '@formily/antd';
import { useMemo } from 'react';
import { observable } from '@formily/reactive';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        Table,
    },
});

let lastState: any = observable({
    data: [],
});

for (var i = 0; i != 10000; i++) {
    lastState.data.push({
        id: i + 1,
        name: 'fish_' + i,
        age: i,
    });
}

export default () => {
    const form = useMemo(() => {
        return createForm({
            values: lastState,
            effects: () => {},
        });
    }, []);
    return (
        <Form form={form} feedbackLayout="terse">
            <SchemaField>
                <SchemaField.Array
                    name="data"
                    x-component="Table"
                    x-component-props={{
                        //默认不打开virtualScroll
                        scroll: {
                            x: 2000,
                            y: 300,
                        },
                        bordered: true,
                        virtualScroll: {
                            //你可以直接传送每行的高度，也可以告诉Table组件当前使用的哪种主题，compact模式，size是大还是小
                            itemHeight: {
                                compact: true,
                                size: 'default',
                            },
                        },
                    }}
                >
                    <SchemaField.Void>
                        <SchemaField.Void
                            x-component={'Table.RadioColumn'}
                            x-component-props={{
                                //当打开Scroll模式的时候，RadioColumn的hidden要用WidthZero模式
                                hidden: 'WidthZero',
                                selectRowByClick: true,
                            }}
                        />
                        <SchemaField.Void
                            title="序号"
                            x-component="Table.Column"
                            x-component-props={{
                                fixed: 'left',
                                width: 100,
                                labelIndex: 'id',
                            }}
                        />
                        <SchemaField.Void
                            title="名字2"
                            x-component="Table.Column"
                            x-component-props={{
                                width: 300,
                                labelIndex: 'name',
                            }}
                        />
                        <SchemaField.Void
                            title="名字3"
                            x-component="Table.Column"
                            x-component-props={{
                                width: 300,
                                labelIndex: 'name',
                            }}
                        />
                        <SchemaField.Void
                            title="名字4"
                            x-component="Table.Column"
                            x-component-props={{
                                width: 300,
                                labelIndex: 'name',
                            }}
                        />
                        <SchemaField.Void
                            title="年龄"
                            x-component="Table.Column"
                            x-component-props={{
                                labelIndex: 'age',
                            }}
                        />
                    </SchemaField.Void>
                </SchemaField.Array>
            </SchemaField>
        </Form>
    );
};
