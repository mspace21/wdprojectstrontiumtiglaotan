import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Expand, PlusCircle, Trash2, GripVertical, CheckCircle, Edit, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
}

interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
}

const exerciseList = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Dumbbell Curl',
  'Triceps Extension',
  'Leg Press',
  'Calf Raise',
  'Pull-up',
  'Push-up',
  'Sit-up',
  'Plank',
  'Running',
  'Swimming',
  'Cycling'
];

const WorkoutDashboard = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState<number | string>('');
  const [reps, setReps] = useState<number | string>('');
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Load from localStorage
  useEffect(() => {
    const savedPlans = localStorage.getItem('workoutPlans');
    if (savedPlans) {
      try {
        setWorkoutPlans(JSON.parse(savedPlans));
      } catch (error) {
        console.error('Error parsing saved workout plans:', error);
        // Handle the error, e.g., clear the corrupted data
        localStorage.removeItem('workoutPlans');
        setWorkoutPlans([]); // Initialize to an empty array
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (workoutPlans.length > 0 || localStorage.getItem('workoutPlans')) {
      localStorage.setItem('workoutPlans', JSON.stringify(workoutPlans));
    }
  }, [workoutPlans]);

  const addWorkoutPlan = () => {
    if (!newPlanName.trim()) return;

    const newPlan: WorkoutPlan = {
      id: crypto.randomUUID(),
      name: newPlanName,
      exercises: [],
    };
    setWorkoutPlans([...workoutPlans, newPlan]);
    setIsAddingPlan(false);
    setNewPlanName('');
  };

  const deleteWorkoutPlan = (id: string) => {
    setWorkoutPlans(workoutPlans.filter((plan) => plan.id !== id));
    if (editingPlanId === id) {
      setEditingPlanId(null);
      setIsEditMode(false);
    }
  };

  const addExerciseToPlan = (planId: string) => {
    const setsNum = Number(sets);
    const repsNum = Number(reps);

    if (!selectedExercise || !setsNum || !repsNum) return;

    const newExercise: Exercise = {
      name: selectedExercise,
      sets: setsNum,
      reps: repsNum,
      completed: false,
    };

    setWorkoutPlans(
      workoutPlans.map((plan) =>
        plan.id === planId
          ? { ...plan, exercises: [...plan.exercises, newExercise] }
          : plan
      )
    );
    setSelectedExercise('');
    setSets('');
    setReps('');
  };

  const deleteExerciseFromPlan = (planId: string, exerciseIndex: number) => {
    setWorkoutPlans(
      workoutPlans.map((plan) =>
        plan.id === planId
          ? {
            ...plan,
            exercises: plan.exercises.filter((_, index) => index !== exerciseIndex),
          }
          : plan
      )
    );
  };

    const toggleExerciseComplete = (planId: string, exerciseIndex: number) => {
    setWorkoutPlans(
      workoutPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              exercises: plan.exercises.map((exercise, index) =>
                index === exerciseIndex
                  ? { ...exercise, completed: !exercise.completed }
                  : exercise
              ),
            }
          : plan
      )
    );
  };

  const startEditingPlan = (planId: string) => {
    setEditingPlanId(planId);
    setIsEditMode(true);
    const planToEdit = workoutPlans.find((plan) => plan.id === planId);
    if (planToEdit) {
      setNewPlanName(planToEdit.name);
    }
  };

  const saveChanges = (planId: string) => {
    if (!newPlanName.trim()) return;
      setWorkoutPlans(
        workoutPlans.map((plan) =>
          plan.id === planId
            ? {
                ...plan,
                name: newPlanName,
              }
            : plan
        )
      );
      setEditingPlanId(null);
      setIsEditMode(false);
      setNewPlanName('');
  };

  const handleDragEnd = (planId: string, newExercises: Exercise[]) => {
    setWorkoutPlans(
      workoutPlans.map((plan) =>
        plan.id === planId ? { ...plan, exercises: newExercises } : plan
      )
    );
  };

    const handleSort = (planId: string, oldIndex: number, newIndex: number) => {
        const currentPlan = workoutPlans.find((plan) => plan.id === planId);
        if (!currentPlan) return;

        const updatedExercises = [...currentPlan.exercises];
        // Remove the item from its old position
        const [movedItem] = updatedExercises.splice(oldIndex, 1);
        // Insert the item into its new position
        updatedExercises.splice(newIndex, 0, movedItem);

        handleDragEnd(planId, updatedExercises);
    };

  return (
    <div className="w-full md:w-6/10 h-auto bg-white rounded-md p-4 shadow-sm relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Workout Dashboard</h1>
        <a href="/fitness-2">
            <Expand className="absolute right-2 top-2"/>
        </a>

        {/* Add New Workout Plan Section */}
        {!isAddingPlan && (
          <Button
            onClick={() => setIsAddingPlan(true)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Workout Plan
          </Button>
        )}

        {isAddingPlan && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">New Workout Plan</h2>
            <div className="mb-4">
              <label htmlFor="planName" className="block text-gray-600 text-sm font-bold mb-2">
                Plan Name
              </label>
              <Input
                type="text"
                id="planName"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
                className="bg-gray-50 text-gray-800"
                placeholder="Workout Plan Name"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingPlan(false);
                  setNewPlanName('');
                }}
                className="bg-gray-50 hover:bg-gray-600 text-gray-800 border-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={addWorkoutPlan}
                className="bg-blue-500 hover:bg-blue-600 text-gray-800"
              >
                Add Plan
              </Button>
            </div>
          </div>
        )}

        {/* Workout Plans List */}
        <AnimatePresence>
          {workoutPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gray-100 p-6 rounded-lg shadow-md mb-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {editingPlanId === plan.id ? (
                      <Input
                        type="text"
                        value={newPlanName}
                        onChange={(e) => setNewPlanName(e.target.value)}
                        className="bg-gray-50 text-gray-800 text-lg font-semibold"
                        onBlur={() => saveChanges(plan.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            saveChanges(plan.id);
                          }
                        }}
                      />
                    ) : (
                      plan.name
                    )}
                  </h2>
                </div>
                <div className="flex gap-2">
                  {editingPlanId === plan.id ? (
                    <Button
                      variant="outline"
                      onClick={() => saveChanges(plan.id)}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50"
                    >
                      <Save className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => startEditingPlan(plan.id)}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => deleteWorkoutPlan(plan.id)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Add Exercise to Plan Section */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Add Exercise</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select
                    value={selectedExercise}
                    onValueChange={setSelectedExercise}
                  >
                    <SelectTrigger className="w-full sm:w-[280px] bg-gray-50 text-gray-800">
                      <SelectValue placeholder="Select an exercise" />
                    </SelectTrigger>
                    <SelectContent className='bg-gray-100 border-gray-700'>
                      {exerciseList.map((exercise) => (
                        <SelectItem key={exercise} value={exercise} className="text-gray-800 hover:bg-gray-600">
                          {exercise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Sets"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full sm:w-32 bg-gray-50 text-gray-800"
                  />
                  <Input
                    type="number"
                    placeholder="Reps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full sm:w-32 bg-gray-50 text-gray-800"
                  />
                  <Button
                    onClick={() => addExerciseToPlan(plan.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-gray-800"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Exercises List */}
              <div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">Exercises</h3>
                {plan.exercises.length === 0 ? (
                  <p className="text-gray-400">No exercises added to this plan yet.</p>
                ) : (
                  <AnimatePresence>
                    {plan.exercises.map((exercise, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-gray-50 p-4 rounded-md shadow-sm mb-2 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleExerciseComplete(plan.id, index)}
                            className={cn(
                              "rounded-full h-10 w-10",
                              exercise.completed
                                ? "bg-green-500 text-gray-800 hover:bg-green-600"
                                : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"
                            )}
                          >
                            {exercise.completed ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <CheckCircle className="h-6 w-6" />
                            )}
                          </Button>
                          <div className={cn(exercise.completed ? "line-through text-gray-400" : "text-gray-800")}>
                            {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteExerciseFromPlan(plan.id, index)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkoutDashboard;